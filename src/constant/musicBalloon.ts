import { ScaleType } from 'types';
import { AnswerBalloonColor } from 'components';

export const TREBLE_BALLOONS = [
  { positionY: 0, scale: ScaleType.A },
  { positionY: 1, scale: ScaleType.G },
  { positionY: 2, scale: ScaleType.F },
  { positionY: 3, scale: ScaleType.E },
  { positionY: 4, scale: ScaleType.D },
  { positionY: 5, scale: ScaleType.C },
  { positionY: 6, scale: ScaleType.B },
  { positionY: 7, scale: ScaleType.A },
  { positionY: 8, scale: ScaleType.G },
  { positionY: 9, scale: ScaleType.F },
  { positionY: 10, scale: ScaleType.E },
  { positionY: 11, scale: ScaleType.D },
  { positionY: 12, scale: ScaleType.C },
];

export const BASS_BALLOONS = [
  { positionY: 0, scale: ScaleType.C },
  { positionY: 1, scale: ScaleType.B },
  { positionY: 2, scale: ScaleType.A },
  { positionY: 3, scale: ScaleType.G },
  { positionY: 4, scale: ScaleType.F },
  { positionY: 5, scale: ScaleType.E },
  { positionY: 6, scale: ScaleType.D },
  { positionY: 7, scale: ScaleType.C },
  { positionY: 8, scale: ScaleType.B },
  { positionY: 9, scale: ScaleType.A },
  { positionY: 10, scale: ScaleType.G },
  { positionY: 11, scale: ScaleType.F },
  { positionY: 12, scale: ScaleType.E },
];

export const SHADOW_BALLOONS = [3, 5, 7, 9];

export const ANSWER_BALLOONS = [
  {
    color: AnswerBalloonColor.Red,
    position: { x: 34.2, y: 38 },
  },
  {
    color: AnswerBalloonColor.Orange,
    position: { x: 25.6, y: 35 },
  },
  {
    color: AnswerBalloonColor.Pink,
    position: { x: 56.4, y: 41.5 },
  },
  {
    color: AnswerBalloonColor.Blue,
    position: { x: 64.7, y: 38 },
  },
  {
    color: AnswerBalloonColor.Yellow,
    position: { x: 19.3, y: 47.2 },
  },
  {
    color: AnswerBalloonColor.RedSmall,
    position: { x: 68.2, y: 48 },
  },
];

export const ANSWER_BALLOONS_COORDINATE = {
  originX: 16,
  originY: -9,
  stepX: 5.3,
  stepY: 2,
};

export const ANSWER_BALLOONS_Y_COORDINATE_OFFSET: Record<AnswerBalloonColor, number> = {
  [AnswerBalloonColor.Blue]: 0.05,
  [AnswerBalloonColor.Orange]: 0.0,
  [AnswerBalloonColor.Pink]: 0.15,
  [AnswerBalloonColor.Red]: 0.05,
  [AnswerBalloonColor.RedSmall]: 0.35,
  [AnswerBalloonColor.Yellow]: 0.3,
};

export const ANIMATION_TIME = 1000;
export const BALLOON_DISTANCE_THRESHOLD = 25;
export const ATTEMPTED_BOUNDARY = 3;

export default {
  ANIMATION_TIME,
  ATTEMPTED_BOUNDARY,
  BALLOON_DISTANCE_THRESHOLD,
  ANSWER_BALLOONS,
  TREBLE_BALLOONS,
  BASS_BALLOONS,
  SHADOW_BALLOONS,
  ANSWER_BALLOONS_Y_COORDINATE_OFFSET,
};
