import { applyMiddleware, combineReducers, createStore, Middleware, StoreEnhancer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import Config from '../Config';
import gamesScore, { GameScoreState } from './gamesScore/reducer';
import gamesDetail, { GamesDetailState } from './gamesDetail/reducer';

export const rootReducer = combineReducers({
  gamesScore,
  gamesDetail,
});

export interface RootState {
  gamesScore: GameScoreState;
  gamesDetail: GamesDetailState;
}

const bindMiddleware = (middleware: Middleware[]): StoreEnhancer => {
  if (Config.nodeEnv === 'development') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const store = createStore(rootReducer, bindMiddleware([thunkMiddleware]));

export default rootReducer;
