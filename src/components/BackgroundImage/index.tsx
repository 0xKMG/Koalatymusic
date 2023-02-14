import { memo, PropsWithChildren } from 'react';
import styles from './styles.module.scss';

export interface IBackgroundImage {
  source?: string;
}

export const BackgroundImage = memo<PropsWithChildren<IBackgroundImage>>(
  ({ children, source }) => (
    <div className={styles.background} style={{ backgroundImage: `url(${source})` }}>
      {children}
    </div>
  ),
);

BackgroundImage.displayName = 'BackgroundImage';
export default BackgroundImage;
