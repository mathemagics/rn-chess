import Piece from './Piece';

class Knight extends Piece {

  constructor(color) {
    super(color);
    this.code = color === 'white' ? '\u2658' : '\u265E';
  }

  movement(row1, col1, board) {
    const row = parseInt(row1, 10);
    const col = parseInt(col1, 10);
    this.board = board;
    this.possible_moves = [[row + 1, col + 2], [row - 1, col + 2],
    [row + 2, col + 1], [row - 2, col + 1],
    [row + 1, col - 2], [row - 1, col - 2],
    [row + 2, col - 1], [row - 2, col - 1]];

  // removing moves that go off board
  this.possible_moves = this.possible_moves.filter(this.isOnBoard);

  // removing moves with teammates, 2nd arg: sets 'this' in callback
  this.possible_moves = this.possible_moves.filter(this.isNotTeammate.bind(this));
  const returnArr = this.possible_moves.map(move => {
    return `${move[0]}${move[1]}`;
  });
  return returnArr;
  }
}

export { Knight };
