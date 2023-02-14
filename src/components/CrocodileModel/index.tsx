import {
  CrocodileDizzy,
  CrocodileMouthClosed,
  CrocodileMouthOpen,
  CrocodileWoodLine,
  CrocodileWoodSpace,
} from 'assets/svgs';
import { memo } from 'react';
import styles from './styles.module.scss';

export enum CrocodileStatus {
  Closed,
  Open,
  Dizzy,
}

export enum CrocodileMode {
  Line,
  Space,
}

export interface ICrocodileModelProps {
  status?: CrocodileStatus;
  type: CrocodileMode;
}

export const CrocodileModel = memo<ICrocodileModelProps>(({ status = 0, type }) => (
  <div className={styles.crocodileModel}>
    <div>
      {
        {
          Line: <CrocodileWoodLine />,
          Space: <CrocodileWoodSpace />,
        }[CrocodileMode[type]]
      }
    </div>
    <div className={styles.crocodile}>
      {
        {
          [CrocodileStatus.Closed]: <CrocodileMouthClosed />,
          [CrocodileStatus.Open]: <CrocodileMouthOpen />,
          [CrocodileStatus.Dizzy]: <CrocodileDizzy />,
        }[status]
      }
    </div>
    <div className={styles.controller} />
  </div>
));

CrocodileModel.displayName = 'CrocodileModel';
export default CrocodileModel;
