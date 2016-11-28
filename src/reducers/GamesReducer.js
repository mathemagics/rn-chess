import {
  FETCH_GAMES_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_GAMES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
