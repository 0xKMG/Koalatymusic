import { cloneElement, memo, PropsWithChildren, ReactElement } from 'react';
import styles from './styles.module.scss';

export interface ISvgBackgroundProps {
  svgImage: ReactElement;
}

export const SvgBackground = memo<PropsWithChildren<ISvgBackgroundProps>>(
  ({ children, svgImage }) => (
    <div>
      <div className={styles.background}>
        {cloneElement(svgImage, { preserveAspectRatio: 'xMidYMid slice' })}
      </div>
      <div>{children}</div>
    </div>
  ),
);

SvgBackground.displayName = 'SvgBackground';
export default SvgBackground;
