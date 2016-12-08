import Chess from '../chess/chess';

import {
  SET_GAME,
  CLICK_OWN_PIECE,
  CLICK_OTHER,
  MAKE_MOVE,
  RECEIVE_MOVE,
  PROMOTION,
  PROMOTE_PAWN,
  NOTICE,
} from '../actions/types';

const INITIAL_STATE = {
 gameId: '',
 myColor: '',
 board: Chess.startBoard(),
 highlighted: [],
 turn: 'white',
 prev: null,
 promoting: false,
 activeSq: '',
 notice: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_GAME:
    {
      const { id, color } = action.payload;
      return { ...state, gameId: id, myColor: color };
    }
    case CLICK_OWN_PIECE:
    {
      const { moves, r, c } = action.payload;
      const { myColor, turn } = state;
      console.log(myColor, ' ', turn);
      if (myColor === turn) {
        return {
          ...state,
          highlighted: moves,
          prev: `${r}${c}`,
          notice: '',
        };
      }
      return state;
    }
    case MAKE_MOVE: {
      console.log('here turn');
      const nextTurn = state.turn === 'white' ? 'black' : 'white';
      return { ...state, highlighted: [], prev: null, turn: nextTurn, notice: '' };
    }
    case RECEIVE_MOVE:
    {
      let nextTurn;
      const { pRow, pCol, sRow, sCol, color } = action.payload;
      console.log('myColor:', state.myColor);
      console.log('turn', state.turn);
      console.log(state.board);

      if (color !== state.myColor) {
        const nextBoard = Chess.movePiece(
          `${pRow}${pCol}`,
          `${sRow}${sCol}`,
          state.board).nextBoard;
        nextTurn = state.turn === 'white' ? 'black' : 'white';
        return { ...state, board: nextBoard, turn: nextTurn, notice: '', prev: null };
      }
      return state;
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
