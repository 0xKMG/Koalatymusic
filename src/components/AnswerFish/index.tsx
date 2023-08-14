import { AnswerFish } from 'assets/svgs';
import { memo } from 'react';
import styles from './styles.module.scss';

export interface IAnswerFishModelProps {
  letter?: string;
}

export const AnswerFishModel = memo<IAnswerFishModelProps>(({ letter }) => (
  <div className={styles.fishModel}>
    <div className={styles.text}>{letter}</div>
    <div className={styles.fish}>
      <AnswerFish />
    </div>
  </div>
));

AnswerFishModel.displayName = 'AnswerFishModel';
export default AnswerFishModel;
