import {
    KoalaVariationOne,
    CrocodileMouthOpen,
  } from 'assets/svgs';
  import { memo } from 'react';
  import styles from './styles.module.scss';

  export enum KoalaVariationStatus {
    variationOne,
    // 11 more variations
  }

  export interface IKoalaModelProps {
    status?: KoalaVariationStatus;
  }

  export const KoalaModel = memo<IKoalaModelProps>(({ status = 0 }) => (
    <div className={styles.koalaModel}>
      <div>

        <CrocodileMouthOpen />

      </div>
      <div className={styles.koala}>
        {
          {
            [KoalaVariationStatus.variationOne]: <KoalaVariationOne />,
            // 11 more variations
          }[status]
        }
      </div>
    </div>
  ));

  KoalaModel.displayName = 'KoalaModel';
  export default KoalaModel;
