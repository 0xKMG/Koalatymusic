import { KoalaHelp } from 'assets/svgs';
import background from 'assets/images/Balloon_Party_Game_Intro_Background.png';
import {
  BackgroundImage,
  BalloonBearModel,
  BearMode,
  BeeMode,
  CheckingBeeModel,
  ImageButton,
} from 'components';
import { TopNav } from 'containers';
import { useNavigate } from 'react-router-dom';
import { IMusicBalloonNode, BalloonType, Spectrum, IAnswerNode, GameLevel } from 'types';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ANSWER_BALLOONS_Y_COORDINATE_OFFSET,
  ATTEMPTED_BOUNDARY,
  BASS_BALLOONS,
  SHADOW_BALLOONS,
  TREBLE_BALLOONS,
} from 'constant';
import { useBalloonPartyGameContext, useGameMode, useWindowSize } from 'hooks';
import { generateAnswers, generateGiven, numberOfBalloons, updateAnswerBalloons } from 'utils';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { Staff } from '../components';
import DraggableBalloon, { IDraggableBalloonProps } from '../components/DraggableBalloon';

export const BalloonPartyGame = (): JSX.Element => {
  const navigate = useNavigate();
  const { gameMode } = useGameMode('balloonPartyMode');
  const { attempted, clearAttempt, coordinate, incorrect } = useBalloonPartyGameContext();
  const { innerWidth, innerHeight } = useWindowSize();
  // states
  const [stage, setStage] = useState<GameLevel>(GameLevel.Easy);
  const [answers, setAnswers] = useState<IAnswerNode[]>(generateAnswers(0, gameMode));
  const [staffBalloons, setStaffBalloons] = useState<IMusicBalloonNode[]>([]);
  const [answerBalloons, setAnswerBalloons] = useState<IDraggableBalloonProps[]>([]);
  const [shadowBalloons, setShadowBalloons] = useState<number[]>([]);
  // reference
  const hintModeRef = useRef<number>(-1);
  const bearRef = useRef<HTMLDivElement>(null);

  // Change balloon appearance in hint mode
  const handleHelpBalloons = useCallback(
    (mode: number, balloons?: IMusicBalloonNode[]) => {
      const helpBalloons = balloons || staffBalloons;
      switch (mode) {
        case 0:
          return helpBalloons.map((v) => ({
            ...v,
            type: v.type === BalloonType.Answer ? BalloonType.Hint : v.type,
          }));
        case 1:
          return helpBalloons.map((v) => ({
            ...v,
            type: v.type === BalloonType.NotGiven ? BalloonType.Given : v.type,
          }));
        case 2:
          setShadowBalloons(SHADOW_BALLOONS);
          return helpBalloons.map((v) => ({
            ...v,
            type: v.type === BalloonType.NotGiven ? BalloonType.Given : v.type,
          }));
        default:
          return helpBalloons;
      }
    },
    [staffBalloons, stage],
  );
  // Enable Hints
  const handleClickHelp = () => {
    hintModeRef.current = stage;
    setStaffBalloons(handleHelpBalloons(stage));
  };

  // A callback function for marking one answer as correct, Passed to `Staff ` as props
  const setAnswerCorrect = useCallback(
    (answers: IAnswerNode[], positionY: number) => {
      setAnswers(
        answers.map((balloon) => {
          const newBalloon = balloon;
          if (balloon.positionY === positionY) newBalloon.answered = true;
          return newBalloon;
        }),
      );
    },
    [answers],
  );

  // Set the appearance of the balloons on the staff
  const updateStaff = () => {
    const baseBalloons = gameMode === Spectrum.Bass ? BASS_BALLOONS : TREBLE_BALLOONS;
    const newStaffBalloons = baseBalloons.map((balloon) => {
      let newType = BalloonType.Hidden;
      let positionX = gameMode === Spectrum.Bass ? balloon.positionY : 12 - balloon.positionY;
      // Set empty appearance only when not answered
      const answerArray = answers.filter(
        (ans) => ans.positionY === balloon.positionY && !ans.answered,
      );
      if (answerArray.length !== 0) {
        newType = BalloonType.Answer;
        positionX = answerArray[0].positionX;
      }
      if (generateGiven(stage, answers).indexOf(balloon.positionY) !== -1) {
        if (stage === GameLevel.Easy) {
          newType = BalloonType.Given;
        } else newType = BalloonType.NotGiven;
      }
      // Change balloon appearance in hint mode
      return {
        positionX,
        positionY: balloon.positionY,
        scale: balloon.scale,
        type: newType,
      };
    });
    setStaffBalloons(
      hintModeRef.current > -1 ? handleHelpBalloons(stage, newStaffBalloons) : newStaffBalloons,
    );
  };

  // Bear's balloons y-axis calculation
  const bearsHolding = (balloons: IDraggableBalloonProps[]) => {
    const clientHeight = (bearRef.current?.clientHeight as number) / 2;
    const offsetTop = (bearRef.current?.offsetTop as number) || 0;
    if (offsetTop && balloons.length > 0) {
      return balloons.map((balloon) => ({
        ...balloon,
        positionY:
          (100 *
            (offsetTop -
              clientHeight +
              clientHeight * ANSWER_BALLOONS_Y_COORDINATE_OFFSET[balloon.color])) /
          innerHeight,
      }));
    }
    return balloons;
  };

  // Make the balloon position responsive
  useEffect(() => {
    setAnswerBalloons(bearsHolding(answerBalloons));
  }, [innerWidth, innerHeight]);

  // Turn on hint mode in case 3 or more mistakes were made
  useEffect(() => {
    if (attempted >= ATTEMPTED_BOUNDARY) {
      hintModeRef.current = stage;
      setStaffBalloons(handleHelpBalloons(stage, staffBalloons));
    }
  }, [attempted]);

  // Check if each stage is clear or if the whole game is clear
  useEffect(() => {
    if (answers.length > 0 && answers.filter((ans) => !ans.answered).length === 0) {
      if (stage === GameLevel.Hard) navigate('/BalloonParty/result');
      else {
        setStage(stage + 1);
      }
    }
    updateStaff();
  }, [answers]);

  // Update notes when stage change
  useEffect(() => {
    const newAnswers = generateAnswers(stage, gameMode);
    hintModeRef.current = -1;
    setAnswers(newAnswers);
    const newAnswerBalloons = updateAnswerBalloons(newAnswers, setAnswerCorrect);
    setAnswerBalloons(bearsHolding(newAnswerBalloons));
    clearAttempt();
  }, [stage]);

  return (
    <div className={styles.balloonGame}>
      <BackgroundImage source={background}>
        <TopNav />
        <div className={styles.gameArea}>
          <div className={styles.staff}>
            <Staff type={gameMode} balloons={staffBalloons} shadow={shadowBalloons} />
          </div>
          <div className={styles.bearContainer} ref={bearRef}>
            <BalloonBearModel
              type={BearMode[incorrect ? 'Sad' : 'Happy']}
              balloons={numberOfBalloons(stage)}
            />
          </div>
          {answerBalloons.map((props) => (
            <DraggableBalloon key={props.color} {...props} />
          ))}
          <CheckingBeeModel
            type={BeeMode[incorrect ? 'Blink' : 'Normal']}
            className={classNames(styles.flyingBee)}
            style={{ transform: `translate(-${coordinate.x}px,${coordinate.y}px)` }}
          />
          <ImageButton onClick={handleClickHelp} className={styles.helpButton}>
            <KoalaHelp />
          </ImageButton>
        </div>
      </BackgroundImage>
    </div>
  );
};

export default BalloonPartyGame;
