import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import GamesReducer from './GamesReducer';
import ChessReducer from './ChessReducer';
import ChatReducer from './ChatReducer';

export default combineReducers({
  auth: AuthReducer,
  games: GamesReducer,
  chess: ChessReducer,
  chat: ChatReducer
});
