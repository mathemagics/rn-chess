import {
  CLICK_SQUARE,
  START_GAME
} from '../actions/types';

const INITIAL_STATE = {
 highlighted: [],
 board: [],
 turn: 'white'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_GAME:
      return { ...state, board: action.payload };
    case CLICK_SQUARE:
      return { ...state, highlighted: action.payload };
    default:
      return state;
  }
};
