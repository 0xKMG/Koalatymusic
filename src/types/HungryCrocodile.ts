import { CrocodileMode } from 'components';

export enum FruitTypes {
  Apple,
  Orange,
  Grape,
  Peach,
  Pear,
  // Pineapple,
}

export interface IFruitNode {
  id: number;
  isStar?: boolean;
  positionY: number;
  fruit: FruitTypes;
  type: CrocodileMode;
  score: number;
}
