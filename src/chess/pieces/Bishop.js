import Piece from './Piece';

class Bishop extends Piece {

  constructor(color) {
  super(color);
  this.code = color === 'white' ? '&#9815' : '&#9821';
  }

  movement(r1, c1, board) {
    const row1 = parseInt(r1, 10);
    const col1 = parseInt(c1, 10);
    this.board = board;
    this.possible_moves = [];
    let row = row1 - 1;
    let col = col1 - 1;
    while (row >= 0 && col >= 0) {
     if (this.checkSquare(row, col)) { break; }
     row -= 1;
     col -= 1;
    }

    row = row1 - 1;
    col = col1 + 1;
    while (row >= 0 && col < 8) {
      if (this.checkSquare(row, col)) { break; }
      row -= 1;
      col += 1;
    }

    row = row1 + 1;
    col = col1 - 1;
    while (row < 8 && col >= 0) {
      if (this.checkSquare(row, col)) { break; }
      row += 1;
      col -= 1;
    }
    row = row1 + 1;
    col = col1 + 1;
    while (row < 8 && col < 8) {
      if (this.checkSquare(row, col)) { break; }
      row += 1;
      col += 1;
    }
    const returnArr = this.possible_moves.map(move => {
      return `${move[0]}${move[1]}`;
    });
    return returnArr;
  }
}

export { Bishop };
