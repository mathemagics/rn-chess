import Piece from './Piece';

class Pawn extends Piece {

  constructor(color) {
    super(color);
    this.code = color === 'white' ? '\u2659' : '\u265F';
  }

  movement(row, col, newBoard) {
    this.possible_moves = [];
    const board = newBoard;
    const row1 = parseInt(row, 10);
    const col1 = parseInt(col, 10);
    if (this.color === 'white') {
      // checking space in front
      if (row1 + 1 < 8 && !board[row1 + 1][col1]) {
        this.possible_moves.push([row1 + 1, col1]);
        // checking 2 spaces in front
        if (row1 === 1 && !board[row1 + 2][col1]) {
          this.possible_moves.push([row1 + 2, col1]);
        }
      }
      //  checking attacking squares
      if (row1 + 1 < 8 && col1 - 1 >= 0) {
        if ((board[row1 + 1][col1 - 1] &&
          board[row1 + 1][col1 - 1].color !== this.color) ||
          (this.checkEnpassant() === col1 - 1 && row1 + 1 === 5)) {
          this.possible_moves.push([row1 + 1, col1 - 1]);
        }
      }
      if (row1 + 1 < 8 && col1 + 1 < 8) {
        if ((board[row1 + 1][col1 + 1]
          && board[row1 + 1][col1 + 1].color !== this.color)
          || (this.checkEnpassant() === col1 + 1 && row1 + 1 === 5)) {
          this.possible_moves.push([row1 + 1, col1 + 1]);
        }
      }
    } else if (this.color === 'black') {
      // checking space in front
      if (row1 - 1 >= 0 && !board[row1 - 1][col1]) {
        this.possible_moves.push([row1 - 1, col1]);
        // checking 2 spaces in front
        if (row1 === 6 && !board[row1 - 2][col1]) {
          this.possible_moves.push([row1 - 2, col1]);
        }
      }
      //  checking attacking squares
      if (row1 - 1 >= 0 && col1 - 1 >= 0) {
        if ((board[row1 - 1][col1 - 1]
        && board[row1 - 1][col1 - 1].color !== this.color)
        || (this.checkEnpassant() === col1 - 1 && row1 - 1 === 2)) {
          this.possible_moves.push([row1 - 1, col1 - 1]);
        }
      }
      if (row1 - 1 >= 0 && col1 + 1 < 8) {
        if ((board[row1 - 1][col1 + 1]
          && board[row1 - 1][col1 + 1].color !== this.color)
          || (this.checkEnpassant() === col1 + 1 && row1 - 1 === 2)) {
          this.possible_moves.push([row1 - 1, col1 + 1]);
        }
      }
    }
    const returnArr = this.possible_moves.map(move => {
      return `${move[0]}${move[1]}`;
    });
    return returnArr;
  }
  // if last move was enpassant, returns the column. else returns 'no''
  checkEnpassant(lastMove, turn) {
    if (lastMove) {
      if (lastMove.piece === 'Pawn') {
        if (turn === 'white') {
          if (lastMove.pRow === 6 && lastMove.sRow === 4) {
            return lastMove.pCol;
          }
        } else if (turn === 'black') {
          if (lastMove.pRow === 1 && lastMove.sRow === 3) {
            return lastMove.pCol;
          }
        }
      }
    }
    return 'no';
  }
}

export { Pawn };
