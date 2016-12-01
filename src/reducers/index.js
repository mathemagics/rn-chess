import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import GamesReducer from './GamesReducer';
import ChessReducer from './ChessReducer';

export default combineReducers({
  auth: AuthReducer,
  games: GamesReducer,
  chess: ChessReducer
});
