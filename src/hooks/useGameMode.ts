import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { updateGameMode } from 'store/gamesDetail/action';
import { gamesDetailInitialState, GamesDetailState } from 'store/gamesDetail/reducer';

type GameMode = keyof GamesDetailState;

interface UseGameModeReturn<T extends GameMode> {
  gameMode: GamesDetailState[T];
  modeUpdate: (mode: GamesDetailState[GameMode]) => void;
  clear: () => void;
}

export const useGameMode = <T extends GameMode>(game: T): UseGameModeReturn<T> => {
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.gamesDetail);

  const handleUpdate = (mode: GamesDetailState[GameMode]) => {
    dispatch(updateGameMode(game, mode));
  };

  const handleClear = () => {
    dispatch(updateGameMode(game, gamesDetailInitialState[game]));
  };

  return {
    gameMode: store[game],
    modeUpdate: handleUpdate,
    clear: handleClear,
  };
};

export default useGameMode;
