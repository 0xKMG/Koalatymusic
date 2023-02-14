export enum ScaleType {
  A,
  B,
  C,
  D,
  E,
  F,
  G,
}

export type ScaleTypeName = keyof typeof ScaleType;

export enum BalloonType {
  Answer,
  Given,
  Hint,
  Hidden,
  NotGiven,
}

export enum GameLevel {
  Easy,
  Normal,
  Hard,
}

export interface IMusicBalloonNode {
  positionX: number;
  positionY: number;
  scale: ScaleType;
  type: BalloonType;
}

export interface IAnswerNode {
  positionX: number;
  positionY: number;
  scale: ScaleType;
  answered: boolean;
}
