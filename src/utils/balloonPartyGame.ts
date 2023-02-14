import {
  ANSWER_BALLOONS,
  ANSWER_BALLOONS_COORDINATE,
  BASS_BALLOONS,
  TREBLE_BALLOONS,
} from 'constant';
import { IDraggableBalloonProps } from 'pages/BalloonParty/components/DraggableBalloon';
import { GameLevel, IAnswerNode, ScaleType, Spectrum } from 'types';

export const checkAnsMismatch = (ans: ScaleType, y: number, mode: Spectrum): boolean => {
  const { scale } = mode === Spectrum.Bass ? TREBLE_BALLOONS[y] : BASS_BALLOONS[y];
  return ans === scale;
};

export const numberOfBalloons = (level: GameLevel): number => (level < 2 ? 5 : 4);

// Randomly select balloons as answer
export const generateAnswers = (level: GameLevel, mode: Spectrum): IAnswerNode[] => {
  const NUMBER_OF_ANSWER = numberOfBalloons(level);
  let positionYArr: number[] = [];
  let positionXArr: number[] = [];

  if (level === GameLevel.Hard) {
    positionYArr = [3, 5, 7, 9];
    while (positionXArr.length < NUMBER_OF_ANSWER) {
      const value = Math.floor(Math.random() * 11) + 1;
      if (positionXArr.indexOf(value) === -1) positionXArr.push(Math.max(2, value));
    }
  } else {
    while (positionYArr.length < NUMBER_OF_ANSWER) {
      const value = Math.floor(Math.random() * 11) + 1;
      // Do not allow answers to include the same scale (self or same scale at another position)
      if (
        positionYArr.indexOf(value) === -1 &&
        positionYArr.indexOf(value + 7) === -1 &&
        positionYArr.indexOf(value - 7) === -1
      ) {
        positionYArr.push(value);
      }
    }

    if (mode === Spectrum.Bass) {
      positionXArr = positionYArr.map((positionY) => positionY);
    } else if (mode === Spectrum.Treble) {
      positionXArr = positionYArr.map((positionY) => 12 - positionY);
    }
  }

  const answerArray: IAnswerNode[] = [];
  for (let i = 0; i < NUMBER_OF_ANSWER; i += 1) {
    answerArray.push({
      positionX: positionXArr[i],
      positionY: positionYArr[i],
      scale:
        mode === Spectrum.Bass
          ? BASS_BALLOONS[positionYArr[i]].scale
          : TREBLE_BALLOONS[positionYArr[i]].scale,
      answered: false,
    });
  }
  return answerArray;
};

// generate given balloons
export const generateGiven = (level: number, newAnswers: IAnswerNode[]): number[] => {
  let givenArray: number[] = [0, 12];
  const answerY = newAnswers.map((ans) => ans.positionY);
  if (level < 2) {
    givenArray = Array.from(Array(13).keys()).filter((v) => !answerY.includes(v));
  }
  return givenArray;
};

// Refresh answer balloons
export const updateAnswerBalloons = (
  newAnswers: IAnswerNode[],
  onCorrect: (answers: IAnswerNode[], positionY: number) => void,
): IDraggableBalloonProps[] =>
  ANSWER_BALLOONS.slice(0, newAnswers.length).map((balloon, i) => ({
    scale: newAnswers[i].scale,
    color: balloon.color,
    positionX: balloon.position.x,
    positionY: balloon.position.y,
    correctX: newAnswers[i].positionX,
    correctY: newAnswers[i].positionY,
    answers: newAnswers,
    onAnswerCorrect: onCorrect,
  }));

// functions for converting relative postions
export const answerToRelativeX = (correctX: number): number =>
  ANSWER_BALLOONS_COORDINATE.originX + ANSWER_BALLOONS_COORDINATE.stepX * correctX;
export const answerToRelativeY = (correctY: number): number =>
  ANSWER_BALLOONS_COORDINATE.originY + ANSWER_BALLOONS_COORDINATE.stepY * correctY;
export const relativeToAbsoluteX = (positionX: number, fullWidth: number): number =>
  (fullWidth / 100) * positionX;
export const relativeToAbsoluteY = (positionY: number, fullHeight: number): number =>
  (fullHeight / 100) * positionY;

// function for checking if the balloon should be slotted in
export const matchAnswerSlot = (
  targetX: number,
  targetY: number,
  x: number,
  y: number,
  threshold: number,
  fullWidth: number,
): boolean => {
  // Adjust to check the distance from center
  const adjustedX = x + (fullWidth / 100) * 2;
  const adjustedY = y + (fullWidth / 100) * 2;
  if (Math.abs(targetX - adjustedX) < threshold && Math.abs(targetY - adjustedY) < threshold) {
    return true;
  }
  return false;
};
