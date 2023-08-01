import { CrocodileMode } from 'components';
import { AnyAction } from 'redux';
import { Spectrum, ShellSpectrum } from 'types';
import { BALLOON_PARTY_MODE, CLEAR_GAMES_DETAIL, HUNGRY_CROCODILE_MODE, SHELL_GAME_MODE } from './actionTypes';

export type GamesDetailState = {
  balloonPartyMode: Spectrum;
  shellGameMode: ShellSpectrum;
  hungryCrocodileMode: CrocodileMode;
};

export const gamesDetailInitialState: GamesDetailState = {
  balloonPartyMode: Spectrum.Treble,
  shellGameMode: ShellSpectrum.Treble,
  hungryCrocodileMode: CrocodileMode.Line,
};

const reducer = (
  state: GamesDetailState = gamesDetailInitialState,
  action: AnyAction,
): GamesDetailState => {
  switch (action.type) {
    case BALLOON_PARTY_MODE:
    case SHELL_GAME_MODE:
    case HUNGRY_CROCODILE_MODE:
      return { ...state, ...action.payload };
    case CLEAR_GAMES_DETAIL:
      return { ...gamesDetailInitialState };
    default:
      return state;
  }
};

export default reducer;
