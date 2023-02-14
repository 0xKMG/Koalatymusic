import { Dispatch } from 'redux';
import { HUNGRY_CROCODILE, CLEAR_GAMES_SCORE } from './actionTypes';
import { GameScoreState } from './reducer';

const getActionType = (key: keyof GameScoreState): string => {
  switch (key) {
    case 'hungryCrocodile':
      return HUNGRY_CROCODILE;
    default:
      return '';
  }
};

export type UpdateGameScoreDispatchType = Dispatch<{
  type: string;
  payload: GameScoreState;
}>;

export const updateGameScore =
  (key: keyof GameScoreState, value: number) =>
  (dispatch: Dispatch): ReturnType<UpdateGameScoreDispatchType> =>
    dispatch({
      type: getActionType(key),
      payload: { [key]: value },
    });

export const clearGamesScore =
  () =>
  (dispatch: Dispatch): Omit<UpdateGameScoreDispatchType, 'payload'> =>
    dispatch({
      type: CLEAR_GAMES_SCORE,
    });
