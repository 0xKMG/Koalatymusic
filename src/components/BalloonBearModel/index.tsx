import { BearHappy, BearSad } from 'assets/svgs';
import { memo } from 'react';
import styles from './styles.module.scss';

export enum BearMode {
  Happy,
  Sad,
}

export interface IBearProps {
  balloons: number;
  type: BearMode;
}

export const BalloonBearModel = memo<IBearProps>(({ balloons, type }) => (
  <div className={styles.container}>
    {type === BearMode.Sad && (
      <div className={styles.sad}>
        <BearSad />
      </div>
    )}
    <div className={styles.happy}>
      <BearHappy balloons={balloons} />
    </div>
  </div>
));

BalloonBearModel.displayName = 'BalloonBearModel';
export default BalloonBearModel;
