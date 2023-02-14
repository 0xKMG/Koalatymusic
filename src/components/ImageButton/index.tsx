import classNames from 'classnames';
import { ButtonHTMLAttributes, forwardRef, memo } from 'react';
import styles from './styles.module.scss';

export const ImageButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, className, ...props }, ref) => (
    <button
      type="button"
      className={classNames(styles.imageButton, className)}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  ),
);

ImageButton.displayName = 'ImageButton';
export default memo(ImageButton);
