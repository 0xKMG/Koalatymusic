import { Bee, BeeBlink } from 'assets/svgs';
import classNames from 'classnames';
import { HTMLAttributes, memo } from 'react';
import styles from './styles.module.scss';

export enum BeeMode {
  Normal,
  Blink,
}

export interface IBeeProps extends HTMLAttributes<HTMLDivElement> {
  type: BeeMode;
}

export const CheckingBeeModel = memo<IBeeProps>(({ className, type, ...props }) => (
  <div className={classNames(styles.bee, className)} {...props}>
    {type === BeeMode.Normal ? <Bee /> : <BeeBlink />}
  </div>
));

CheckingBeeModel.displayName = 'CheckingBeeModel';
export default CheckingBeeModel;
