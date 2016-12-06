import Chess from '../chess/chess';

import {
  CLICK_OWN_PIECE,
  CLICK_OTHER,
  MAKE_MOVE,
  PROMOTION,
  PROMOTE_PAWN,
  NOTICE
} from '../actions/types';

const INITIAL_STATE = {
 highlighted: [],
 board: Chess.startBoard(),
 turn: 'white',
 prev: null,
 promoting: false,
 activeSq: '',
 notice: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLICK_OWN_PIECE:
    {
      const { moves, r, c } = action.payload;
      return {
        ...state,
        highlighted: moves,
        prev: `${r}${c}`,
        notice: ''
      };
    }
    case MAKE_MOVE: {
      const nextTurn = state.turn === 'white' ? 'black' : 'white';
      return { ...state, highlighted: [], prev: null, turn: nextTurn, notice: '' };
    }
    case CLICK_OTHER:
      return { ...state, highlighted: [], notice: '' };
    case PROMOTION:
      return { ...state, promoting: true, activeSq: action.payload };
    case PROMOTE_PAWN: {
      const { nextBoard } = action.payload;
      const nextTurn = state.turn === 'white' ? 'black' : 'white';
      return {
        ...state,
        highlighted: [],
        prev: null,
        notice: '',
        promoting: false,
        board: nextBoard,
        turn: nextTurn
      };
    }
    case NOTICE:
      return {
        ...state,
        notice: action.payload,
        highlighted: [],
        prev: null,
        promoting: false,
        activeSq: ''
      };
    default:
      return state;
  }
};
