import Piece from './Piece';

class King extends Piece {
  constructor(color) {
  super(color);
  this.code = color === 'white' ? '\u2654' : '\u265A';
  }
  movement(r1, c1, board) {
    const row1 = parseInt(r1, 10);
    const col1 = parseInt(c1, 10);
    this.board = board;
    this.possible_moves = [[row1 + 1, col1 - 1], [row1 + 1, col1], [row1 + 1, col1 + 1],
    [row1, col1 - 1], [row1, col1 + 1],
    [row1 - 1, col1 - 1], [row1 - 1, col1], [row1 - 1, col1 + 1]];

  // removing moves that go off the board
  this.possible_moves = this.possible_moves.filter(this.isOnBoard);
  // removing moves with teammates, 2nd arg: sets 'this' in callback
  this.possible_moves = this.possible_moves.filter(this.isNotTeammate, this);
  // removing moves that are under attack
  this.possible_moves = this.possible_moves.filter(this.isNotUnderAttack, this);

  // adding castling moves
  if (this.initial) {
    if (this.color === 'white') {
      // kingside
      if (board[0][7] && board[0][7].initial && !board[0][6] && !board[0][5]) {
        this.possible_moves.push([0, 6]);
      }
      // queenside
      if (board[0][0] && board[0][0].initial && !board[0][1] && !board[0][2] && !board[0][3]) {
        this.possible_moves.push([0, 2]);
      }
    } else if (this.color === 'black') {
      // kingside
      if (board[7][7] && board[7][7].initial && !board[7][6] && !board[7][5]) {
        this.possible_moves.push([7, 6]);
      }
      // queenside
      if (board[7][0] && board[7][0].initial && !board[7][1] && !board[7][2] && !board[7][3]) {
        this.possible_moves.push([7, 2]);
      }
    }
  }

  const returnArr = this.possible_moves.map(move => {
    return `${move[0]}${move[1]}`;
  });
  return returnArr;
  }

  //returns true if a given square is under attack
  isNotUnderAttack = (move) => {
    //for all oponent pieces, check if this sq is in their movelist
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const atkr = this.board[i][j];
        if (atkr && atkr !== 'enpassant' && atkr.color !== this.color) {
          if (atkr instanceof King) {
            // check to see if in range of enemy king
          } else if (this.isCoordInArr([move[0], move[1]], atkr.movement(i, j, this.board))) {
              return false;
            }
        }
      }
    }
    return true;
  }

}

export { King };
