import Chess from '../chess/chess';

import {
  CLICK_OWN_PIECE,
  CLICK_OTHER,
  MAKE_MOVE
} from '../actions/types';

const INITIAL_STATE = {
 highlighted: [],
 board: Chess.startBoard(),
 turn: 'white',
 prev: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLICK_OWN_PIECE:
    {
      const { moves, r, c } = action.payload;
      return {
        ...state,
        highlighted: moves,
        prev: `${r}${c}`
      };
    }
    case MAKE_MOVE: {
      const nextTurn = state.turn === 'white' ? 'black' : 'white';
      return { ...state, highlighted: [], prev: null, turn: nextTurn };
    }

    case CLICK_OTHER:
      return { ...state, highlighted: [] };
    default:
      return state;
  }
};
