import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import GamesReducer from './GamesReducer';

export default combineReducers({
  auth: AuthReducer,
  games: GamesReducer
});
