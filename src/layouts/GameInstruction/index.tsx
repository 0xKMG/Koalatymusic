import { KoalaHoldingBalloon } from 'assets/svgs';
import classNames from 'classnames';
import { BackgroundImage, ImageButton } from 'components';
import { useAudioOnce, useCountdown } from 'hooks';
import { HTMLAttributes, memo } from 'react';
import audioEffect from 'assets/audio/Game_Menu_Click.mp3';
import { TopNav } from 'containers';
import styles from './styles.module.scss';

export interface IGameInstructionProps extends HTMLAttributes<HTMLDivElement> {
  backgroundImage?: string;
  onStart?: () => void;
  disabled?: boolean;
}

export const GameInstruction = memo<IGameInstructionProps>(
  ({ backgroundImage, children, className, disabled, onStart, ...props }) => {
    const { play } = useAudioOnce({
      source: audioEffect,
    });
    const countDown = useCountdown(3);

    const handleStartClick = () => {
      play();
      onStart?.();
    };
    return (
      <>
        <BackgroundImage source={backgroundImage} />
        <div className={classNames(styles.instruction, className)} {...props}>
          <TopNav />
          <div className={styles.instructionArea}>
            <div className={styles.content}>{children}</div>
          </div>
          <div
            className={classNames(styles.start, { [styles.disabled]: countDown > 0 || disabled })}
          >
            <ImageButton
              className={styles.button}
              disabled={countDown > 0 || disabled}
              onClick={handleStartClick}
            >
              <KoalaHoldingBalloon />
            </ImageButton>
          </div>
        </div>
      </>
    );
  },
);

GameInstruction.displayName = 'GameInstruction';
export default GameInstruction;
