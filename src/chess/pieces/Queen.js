import Piece from './Piece';

class Queen extends Piece {

  constructor(color) {
    super(color);
    this.code = color === 'white' ? '\u2655' : '\u265B';
  }
  movement(r, c, board) {
    const row1 = parseInt(r, 10);
    const col1 = parseInt(c, 10);
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

export { Queen };
