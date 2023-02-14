import { KoalaNiceTry } from 'assets/svgs';
import classNames from 'classnames';
import { memo, ReactNode } from 'react';
import WoodNiceTry from 'assets/images/Wood_Nice_Try.png';
import styles from '../styles.module.scss';

export const NiceTryModel = memo(({ content }: { content: ReactNode }) => (
  <div className={styles.model}>
    <KoalaNiceTry
      className={classNames(styles.koala, styles.koalaNiceTry)}
      style={{ width: '75%' }}
    />
    <div className={classNames(styles.wood)}>
      <img src={WoodNiceTry} alt="WoodNiceTry" className={styles.woodNiceTry} />
      <div className={styles.woodContent}>{content}</div>
    </div>
  </div>
));

NiceTryModel.displayName = 'NiceTryModel';
export default NiceTryModel;
