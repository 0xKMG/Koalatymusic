import { Dispatch } from 'redux';
import {
  BALLOON_PARTY_MODE,
  CLEAR_GAMES_DETAIL,
  HUNGRY_CROCODILE_MODE,
  SHELL_GAME_MODE,
} from './actionTypes';
import { GamesDetailState } from './reducer';

const getActionType = (key: keyof GamesDetailState): string => {
  switch (key) {
    case 'balloonPartyMode':
      return BALLOON_PARTY_MODE;
    case 'hungryCrocodileMode':
      return HUNGRY_CROCODILE_MODE;
    case 'shellGameMode':
      return SHELL_GAME_MODE;
    default:
      return '';
  }
};

export type UpdateGameScoreDispatchType = Dispatch<{
  type: string;
  payload: Partial<GamesDetailState>;
}>;

export const updateGameMode =
  (key: keyof GamesDetailState, value: GamesDetailState[typeof key]) =>
  (dispatch: Dispatch): ReturnType<UpdateGameScoreDispatchType> =>
    dispatch({
      type: getActionType(key),
      payload: { [key]: value },
    });

export const clearGamesDetail =
  () =>
  (dispatch: Dispatch): Omit<UpdateGameScoreDispatchType, 'payload'> =>
    dispatch({
      type: CLEAR_GAMES_DETAIL,
    });
