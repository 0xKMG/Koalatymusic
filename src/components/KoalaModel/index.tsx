import {
  KoalaVariationOne,
  KoalaVariationTwo,
  KoalaVariationThree,
  KoalaVariationFour,
  KoalaVariationFive,
  KoalaVariationSix,
  KoalaVariationSeven,
  KoalaVariationEight,
  KoalaVariationNine,
  KoalaVariationTen,
  KoalaVariationEleven,
  KoalaVariationTwelve,
  CrocodileMouthOpen,
} from 'assets/svgs';
import { memo } from 'react';
import styles from './styles.module.scss';

export enum KoalaVariationStatus {
  variationOne,
  variationTwo,
  variationThree,
  variationFour,
  variationFive,
  variationSix,
  variationSeven,
  variationEight,
  variationNine,
  variationTen,
  variationEleven,
  variationTwelve,
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
          [KoalaVariationStatus.variationTwo]: <KoalaVariationTwo />,
          [KoalaVariationStatus.variationThree]: <KoalaVariationThree />,
          [KoalaVariationStatus.variationFour]: <KoalaVariationFour />,
          [KoalaVariationStatus.variationFive]: <KoalaVariationFive />,
          [KoalaVariationStatus.variationSix]: <KoalaVariationSix />,
          [KoalaVariationStatus.variationSeven]: <KoalaVariationSeven />,
          [KoalaVariationStatus.variationEight]: <KoalaVariationEight />,
          [KoalaVariationStatus.variationNine]: <KoalaVariationNine />,
          [KoalaVariationStatus.variationTen]: <KoalaVariationTen />,
          [KoalaVariationStatus.variationEleven]: <KoalaVariationEleven />,
          [KoalaVariationStatus.variationTwelve]: <KoalaVariationTwelve />,

          // 11 more variations
        }[status]
      }
    </div>
  </div>
));

KoalaModel.displayName = 'KoalaModel';
export default KoalaModel;
