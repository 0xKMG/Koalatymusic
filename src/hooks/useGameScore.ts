import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { updateGameScore } from 'store/gamesScore/action';
import { GameScoreState } from 'store/gamesScore/reducer';

interface UseGameScoreReturn {
  score: number;
  scoreUpdate: (score: number) => void;
}

export const useGameScore = (game: keyof GameScoreState): UseGameScoreReturn => {
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.gamesScore);

  const handleUpdate = (score: number) => {
    dispatch(updateGameScore(game, score));
  };

  return { score: store[game], scoreUpdate: handleUpdate };
};

export default useGameScore;
