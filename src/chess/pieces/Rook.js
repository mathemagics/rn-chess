import Piece from './Piece';

class Rook extends Piece {
  constructor(color) {
  super(color);
  this.code = color === 'white' ? '&#9814' : '&#9820';
  }

  movement(row, col, board) {
    const row1 = parseInt(row, 10);
    const col1 = parseInt(col, 10);
    this.board = board;
    this.possible_moves = [];
    let r1 = row1 + 1;
    while (r1 < 8) {
      if (this.checkSquare(r1, col1)) { break; }
      r1 += 1;
    }
    r1 = row1 - 1;
    while (r1 >= 0) {
      if (this.checkSquare(r1, col1)) { break; }
      r1 -= 1;
    }
    let c1 = col1 + 1;
    while (c1 < 8) {
      if (this.checkSquare(row1, c1)) { break; }
      c1 += 1;
    }
    c1 = col1 - 1;
    while (c1 >= 0) {
      if (this.checkSquare(row1, c1)) { break; }
      c1 -= 1;
    }
    const returnArr = this.possible_moves.map(move => {
      return `${move[0]}${move[1]}`;
    });
    return returnArr;
  }
}

export { Rook } ;
