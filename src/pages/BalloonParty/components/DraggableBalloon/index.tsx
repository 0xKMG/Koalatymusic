import { AnswerBalloon, IAnswerBalloonProps } from 'components';
import { ANIMATION_TIME, BALLOON_DISTANCE_THRESHOLD } from 'constant';
import { useBalloonPartyGameContext, useWindowSize } from 'hooks';
import { memo, useEffect, useRef, useState } from 'react';
import Draggable, { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable';
import { IAnswerNode, ScaleType } from 'types';
import useSound from 'use-sound';
import {
  answerToRelativeX,
  answerToRelativeY,
  matchAnswerSlot,
  relativeToAbsoluteX,
  relativeToAbsoluteY,
} from 'utils';
import correctEffect from 'assets/audio/Pop_Ding_Notification_Sound.mp3';
import wrongEffect from 'assets/audio/Quest_Game_UI_Menu_UI_Click_2_Balloon.mp3';
import classNames from 'classnames';
import styles from './style.module.scss';

export interface IDraggableBalloonProps extends IAnswerBalloonProps {
  scale: ScaleType;
  positionX: number;
  positionY: number;
  correctX: number;
  correctY: number;
  answers: IAnswerNode[];
  onAnswerCorrect: (answers: IAnswerNode[], positionY: number) => void;
}
export const DraggableBalloon = memo<IDraggableBalloonProps>(
  ({ color, scale, positionX, positionY, correctX, correctY, answers, onAnswerCorrect }) => {
    const [playCorrect] = useSound(correctEffect);
    const [playWrong] = useSound(wrongEffect);

    const { innerWidth, innerHeight } = useWindowSize();
    const { addAttempt, updateCoordinate, setIsStaffMismatch } = useBalloonPartyGameContext();

    const [absPos, setAbsPos] = useState<{ x: number; y: number }>({
      x: relativeToAbsoluteX(positionX, innerWidth),
      y: relativeToAbsoluteY(positionY, innerHeight),
    });
    const [answered, setAnswered] = useState<boolean>(false);
    const modelRef = useRef<DraggableCore>(null);
    const nodeRef = useRef<HTMLDivElement>(null);

    const slotToAnswer = (absProposedX: number, absProposedY: number) => {
      setAnswered(true);
      setAbsPos({ x: absProposedX, y: absProposedY });
    };

    const resetBalloonPosition = () => {
      setAnswered(false);
      setAbsPos({
        x: relativeToAbsoluteX(positionX, innerWidth),
        y: relativeToAbsoluteY(positionY, innerHeight),
      });
    };

    const draggingHandler = (e: DraggableEvent, data: DraggableData) => {
      // setAbsPosY((innerWidth * -90) / 795);
      // Only consider screen width as the staff H:W ratio is fixed
      answers.forEach((ans) => {
        const absProposedCorrectX = relativeToAbsoluteX(
          answerToRelativeX(ans.positionX),
          innerWidth,
        );
        const absProposedCorrectY = relativeToAbsoluteY(
          answerToRelativeY(ans.positionY),
          innerWidth,
        );
        if (
          matchAnswerSlot(
            absProposedCorrectX,
            absProposedCorrectY,
            data.x,
            data.y,
            BALLOON_DISTANCE_THRESHOLD,
            innerWidth,
          )
        ) {
          slotToAnswer(absProposedCorrectX, absProposedCorrectY);
          if (ans.positionY === correctY) {
            playCorrect();
            onAnswerCorrect(answers, correctY);
          } else {
            playWrong();
            // wrong animation (bee)
            addAttempt();
            updateCoordinate(innerWidth - absProposedCorrectX - 70, data.y - 30);
            // wrong animation (blinking clef)
            setIsStaffMismatch(scale, (answerToRelativeY(ans.positionY) + 9) / 2);
            // reset all
            setTimeout(() => {
              resetBalloonPosition();
            }, ANIMATION_TIME);
          }
        }
      });
    };

    // Reset balloon location after each stage
    useEffect(() => {
      if (answers.filter((ans) => ans.positionY === correctY && !ans.answered).length === 1) {
        setAbsPos({
          x: relativeToAbsoluteX(positionX, innerWidth),
          y: relativeToAbsoluteY(positionY, innerHeight),
        });

        setAnswered(false);
      }
    }, [answers]);

    // Refresh coordinates with screen size changes
    useEffect(() => {
      if (answered) {
        setAbsPos({
          x: relativeToAbsoluteX(answerToRelativeX(correctX), innerWidth),
          y: relativeToAbsoluteY(answerToRelativeY(correctY), innerWidth),
        });
      } else {
        setAbsPos({
          x: relativeToAbsoluteX(positionX, innerWidth),
          y: relativeToAbsoluteY(positionY, innerHeight),
        });
      }
    }, [innerHeight, innerWidth]);

    return (
      <Draggable
        key={color}
        position={{
          x: absPos.x,
          y: absPos.y,
        }}
        onStop={draggingHandler}
        disabled={answered}
        ref={modelRef}
        nodeRef={nodeRef}
      >
        <div className={styles.draggableBalloon} ref={nodeRef}>
          <div className={styles.balloon} style={{ width: answered ? '65%' : '100%' }}>
            <AnswerBalloon color={color} />
          </div>
          <div className={classNames(styles.scale, { [styles.answered]: answered })}>
            <div>{ScaleType[scale]}</div>
          </div>
        </div>
      </Draggable>
    );
  },
);

DraggableBalloon.displayName = 'DraggableBalloon';
export default DraggableBalloon;
