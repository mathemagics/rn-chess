// import firebase from 'firebase';
import Chess from '../chess/chess';
// import { Actions } from 'react-native-router-flux';

import {
  CLICK_OWN_PIECE,
  CLICK_OTHER,
  MAKE_MOVE
} from './types';

export const clickSquare = (sq, board, highlighted, prev) => {
  const r = parseInt(sq[0], 10);
  const c = parseInt(sq[1], 10);

  if (highlighted.includes(sq.toString())) {
    // if clicking on an available move sq
    const nextBoard = Chess.movePiece(prev, sq, board);
    return {
      type: MAKE_MOVE,
      payload: { prev, sq, nextBoard }
    };
  } else if (board[r][c]) {
    // if clicking on your own piece
      const moves = board[r][c].movement(sq[0], sq[1], board);
      return {
        type: CLICK_OWN_PIECE,
        // payload contains, row, col of selected piece
        // and it's associated moves
        payload: { moves, r, c }
      };
  }
    return {
      type: CLICK_OTHER,
    };
};
