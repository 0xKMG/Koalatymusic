import { ScoreBoard as ScoreBoardImage, Star } from 'assets/svgs';
import { memo } from 'react';
import styles from './styles.module.scss';

export interface IScoreBoardProps {
  time?: number;
  score?: number | string;
}

export const ScoreBoard = memo<IScoreBoardProps>(({ time = 0, score = 0 }) => {
  const TIMER = `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(
    2,
    '0',
  )}`;
  return (
    <div className={styles.scoreBoard}>
      <ScoreBoardImage />
      <div className={styles.area}>
        <div className={styles.timer}>{TIMER}</div>
        <div className={styles.score}>
          <Star className={styles.star} />
          {score}
        </div>
      </div>
    </div>
  );
});

ScoreBoard.displayName = 'ScoreBoard';
export default ScoreBoard;
