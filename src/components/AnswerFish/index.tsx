import { AnswerFish } from 'assets/svgs';
import { memo } from 'react';
import styles from './styles.module.scss';

export interface IAnswerFishModelProps {
  letter?: string;
}

export const AnswerFishModel = memo<IAnswerFishModelProps>(({ letter }) => (
  <div style={{ position: 'relative', right: '62%' }}>
    <div className={styles.fish}>
      <AnswerFish />
    </div>
    <div className={styles.text}>{letter}</div>
  </div>
));

AnswerFishModel.displayName = 'AnswerFishModel';
export default AnswerFishModel;
