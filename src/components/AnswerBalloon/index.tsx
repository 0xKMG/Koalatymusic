import {
  AnswerBalloonBlue,
  AnswerBalloonOrange,
  AnswerBalloonPink,
  AnswerBalloonRed,
  AnswerBalloonRedSmall,
  AnswerBalloonYellow,
} from 'assets/svgs';
import { memo } from 'react';

export enum AnswerBalloonColor {
  Blue,
  Red,
  RedSmall,
  Orange,
  Pink,
  Yellow,
}

export interface IAnswerBalloonProps {
  color: AnswerBalloonColor;
}

export const AnswerBalloon = memo<IAnswerBalloonProps>(({ color }) => (
  <div>
    {
      {
        Blue: <AnswerBalloonBlue />,
        Red: <AnswerBalloonRed />,
        RedSmall: <AnswerBalloonRedSmall />,
        Orange: <AnswerBalloonOrange />,
        Pink: <AnswerBalloonPink />,
        Yellow: <AnswerBalloonYellow />,
      }[AnswerBalloonColor[color]]
    }
  </div>
));

AnswerBalloon.displayName = 'AnswerBalloon';
export default AnswerBalloon;
