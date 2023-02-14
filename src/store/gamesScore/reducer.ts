import { AnyAction } from 'redux';
import { HUNGRY_CROCODILE, CLEAR_GAMES_SCORE } from './actionTypes';

export type GameScoreState = {
  hungryCrocodile: number;
};

const initialState: GameScoreState = {
  hungryCrocodile: 0,
};

const reducer = (state: GameScoreState = initialState, action: AnyAction): GameScoreState => {
  switch (action.type) {
    case HUNGRY_CROCODILE:
      return { ...state, ...action.payload };
    case CLEAR_GAMES_SCORE:
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;
