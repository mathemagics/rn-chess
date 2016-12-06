// import firebase from 'firebase';
import Chess from '../chess/chess';
// import { Actions } from 'react-native-router-flux';

import {
  CLICK_OWN_PIECE,
  CLICK_OTHER,
  MAKE_MOVE,
  PROMOTION,
  PROMOTE_PAWN,
  NOTICE
} from './types';

export const promotePawn = (prev, sq, piece, board, turn) => {
  const r = parseInt(sq[0], 10);
  const c = parseInt(sq[1], 10);

  const nextBoard = Chess.setPromotion(r, c, prev, piece, board, turn);
  checkForCheck(r, c, nextBoard, turn);
  return {
    type: PROMOTE_PAWN,
    payload: { nextBoard }
  };
};

export const clickSquare = (sq, board, highlighted, prev, turn) => {
  const r = parseInt(sq[0], 10);
  const c = parseInt(sq[1], 10);
  let pR;
  let pC;
  if (prev) {
    pR = parseInt(prev[0], 10);
    pC = parseInt(prev[1], 10);
  }
  console.log(board[r][c]);
  if (highlighted.includes(sq.toString())) {
    // if clicking on an available move sq
    const thisPiece = board[pR][pC];
    const prevPiece = board[r][c];
    const { response, nextBoard } = Chess.movePiece(prev, sq, board);
    // check if move puts self into check
    if (!legalMove(nextBoard, turn)) {
      nextBoard[r][c] = prevPiece;
      nextBoard[pR][pC] = thisPiece;
      return {
        type: NOTICE,
        payload: 'Illegal Move'
      };
    }
    if (response === 'promote') {
      return {
        type: PROMOTION,
        payload: sq
      };
    } else if (response === 'move') {
      checkForCheck(r, c, nextBoard, turn);

      // return check notice
    }
    return {
      type: MAKE_MOVE,
      payload: { prev, sq, nextBoard }
    };
  } else if (board[r][c] && board[r][c].color === turn) {
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

const checkForCheck = (r, c, nextBoard, turn) => {
  if (Chess.checkCheck(r, c, nextBoard, turn)) {
    console.log('CHECK!');
    if (Chess.checkCheckmate(nextBoard, turn)) {
      console.log('Checkmate');
    }
  }
};

const legalMove = (nextBoard, turn) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      // getting enemy pieces
      const thisPiece = nextBoard[i][j];
      if (thisPiece && thisPiece !== 'enpassant' && thisPiece.color !== turn) {
        console.log(thisPiece);
        if (Chess.checkCheck(i, j, nextBoard)) {
          return false;
        }
      }
    }
  }
  return true;
};
