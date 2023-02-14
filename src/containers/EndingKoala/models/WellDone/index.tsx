import { KoalaWellDone } from 'assets/svgs';
import classNames from 'classnames';
import { memo, ReactNode } from 'react';
import WoodWellDone from 'assets/images/Wood_Well_Done.png';
import styles from '../styles.module.scss';

export const WellDoneModel = memo(({ content }: { content: ReactNode }) => (
  <div className={styles.model}>
    <KoalaWellDone className={classNames(styles.koala, styles.koalaWellDone)} />
    <div className={classNames(styles.wood)}>
      <img src={WoodWellDone} alt="WoodWellDone" className={styles.woodWellDone} />
      <div className={styles.woodContent}>{content}</div>
    </div>
  </div>
));

WellDoneModel.displayName = 'WellDoneModel';
export default WellDoneModel;
