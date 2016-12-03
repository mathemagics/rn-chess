import Chess from '../chess/chess';
// import { Actions } from 'react-native-router-flux';
// import firebase from './firebase';

import {
  CLICK_SQUARE,
  START_GAME
} from './types';

export const startGame = () => {
  const board = Chess.startBoard();
  return {
    type: START_GAME,
    payload: board
  };
};

export const clickSquare = (sq, board, highlighted) => {
  const r = parseInt(sq[0], 10);
  const c = parseInt(sq[1], 10);
  console.log('hi:', highlighted);
  console.log('sq:', sq);

  // add check color of piece
  if (highlighted.includes(sq.toString())) {
    console.log('move!');
    return {
      type: CLICK_SQUARE,
      payload: []
    };
  } else if (board[r][c]) {
      const moves = board[r][c].movement(sq[0], sq[1], board);
      return {
        type: CLICK_SQUARE,
        payload: moves
      };
  } else {
    return {
      type: CLICK_SQUARE,
      payload: []
    };
  }
};
