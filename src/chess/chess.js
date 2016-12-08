import { Pawn, Bishop, Knight, Rook, Queen, King } from './pieces';

class Chess {
  constructor() {
    this.board = [];
    this.turn = 'white';
    this.promoting = false;
    this.availMoves = [];
  }

  static startBoard() {
    const board = [];
    for (let i = 0; i < 8; i++) {
        board[i] = [];
    }
    for (let i = 0; i < 8; i++) {
        board[1][i] = new Pawn('white');
        board[6][i] = new Pawn('black');
    }
    board[0][0] = new Rook('white');
    board[0][1] = new Knight('white');
    board[0][2] = new Bishop('white');
    board[0][3] = new Queen('white');
    board[0][4] = new King('white');
    board[0][5] = new Bishop('white');
    board[0][6] = new Knight('white');
    board[0][7] = new Rook('white');
    board[7][0] = new Rook('black');
    board[7][1] = new Knight('black');
    board[7][2] = new Bishop('black');
    board[7][3] = new Queen('black');
    board[7][4] = new King('black');
    board[7][5] = new Bishop('black');
    board[7][6] = new Knight('black');
    board[7][7] = new Rook('black');
    return (board);
  }

  static movePiece = (prev, sq, newBoard) => {
    const pRow = parseInt(prev[0], 10);
    const pCol = parseInt(prev[1], 10);
    const sRow = parseInt(sq[0], 10);
    const sCol = parseInt(sq[1], 10);
    const board = newBoard;
    // clear enpassant
    console.log(board);

    for (let i = 0; i < 8; i++) {
      if (!(sRow === 2 && sCol === i)) {
        board[2][i] = board[2][i] === 'enpassant' ? null : board[2][i];
      }
      if (!(sRow === 5 && sCol === i)) {
        board[5][i] = board[5][i] === 'enpassant' ? null : board[5][i];
      }
    }
    const thisPiece = board[pRow][pCol];
    console.log('thispiece', thisPiece);
    // checking if castle
    if (thisPiece && thisPiece.constructor.name === 'King' && thisPiece.initial) {
        // checking which rook to swap
        if (sRow === 0 && sCol === 6) {
          board[0][5] = board[0][7];
          board[0][7] = null;
        } else if (sRow === 0 && sCol === 2) {
          board[0][3] = board[0][0];
          board[0][0] = null;
        } else if (sRow === 7 && sCol === 6) {
          board[7][5] = board[7][7];
          board[7][7] = null;
        } else if (sRow === 7 && sCol === 2) {
          board[7][3] = board[7][0];
          board[7][0] = null;
        }
    } else if (thisPiece && thisPiece.constructor.name === 'Pawn') {
      // adding en passant squares
      if (sRow - pRow === 2) {
        board[pRow + 1][pCol] = 'enpassant';
      } else if (pRow - sRow === 2) {
        board[pRow - 1][pCol] = 'enpassant';
      } else if (sRow === 7 || sRow === 0) {
        // setting promotion:
        return { response: 'promote', nextBoard: board };
      } else if (board[sRow][sCol] === 'enpassant') {
        // removing attacked piece through en passant
        if (sRow === 2) board[3][sCol] = null;
        else if (sRow === 5) board[4][sCol] = null;
      }
    }
    // setting real board
    thisPiece.initial = false;
    board[sRow][sCol] = board[pRow][pCol];
    board[pRow][pCol] = null;
    return { response: 'move', nextBoard: board };
  }

  static checkCheck(sRow, sCol, board) {
    const thisPiece = board[sRow][sCol];
    console.log(thisPiece);
    const movesArr = thisPiece.movement(sRow, sCol);
    for (let i = 0, n = movesArr.length; i < n; i++) {
      const atkd = board[movesArr[i][0]][movesArr[i][1]];
      if (atkd && atkd instanceof King && atkd.color !== thisPiece.color) {
        console.log('CHECK!');
        return true;
      }
    }
    return false;
  }

  static checkCheckmate(board, turn) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        // getting enemy pieces
        const thisPiece = board[i][j];
        if (thisPiece && thisPiece.color !== turn) {
          const movesArr = thisPiece.movement(i, j, board);
          for (let k = 0, n = movesArr.length; k < n; k++) {
            const pRow = i;
            const pCol = j;
            const sRow = movesArr[k][0];
            const sCol = movesArr[k][1];
            if (this.removeCheck(sRow, sCol, pRow, pCol, board, turn)) { return false; }
          }
        }
      }
    }
    return true;
  }

  // returns true if current move removes check
  // thisPiece is attacking piece from prow, pcol to srow,scol
  static removeCheck(sRow, sCol, pRow, pCol, board, turn) {
    const takenSpot = board[sRow][sCol];
    console.log(board[pRow][pCol]);
    board[sRow][sCol] = board[pRow][pCol];
    board[pRow][pCol] = null;
    const checkColor = turn === 'white' ? 'black' : 'white';
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        // getting enemy pieces
        const atkr = board[i][j];
        console.log(atkr);
        if (atkr && atkr !== 'enpassant' && atkr.color !== checkColor) {
          const movesArr = atkr.movement(i, j, board);

          // checking if our king is in their movelist
          for (let k = 0, n = movesArr.length; k < n; k++) {
            const atkd = board[movesArr[k][0]][movesArr[k][1]];

            if (atkd && atkd instanceof King && atkd.color === checkColor) {
              console.log('still in check');
              board[pRow][pCol] = board[sRow][sCol];
              board[sRow][sCol] = takenSpot;
              return false;
            }
          }
        }
      }
    }
    board[pRow][pCol] = board[sRow][sCol];
    board[sRow][sCol] = takenSpot;
    return true;
  }

  static setPromotion(sRow, sCol, prev, piece, board, turn) {
    let promoted;
    const pRow = parseInt(prev[0], 10);
    const pCol = parseInt(prev[1], 10);
    console.log(board);
    console.log(board[prev[0]]);
    switch (piece) {
      case '\u2655':
      case '\u265B':
        promoted = new Queen(turn);
      break;
      case '\u2656':
      case '\u265C':
        promoted = new Rook(turn);
      break;
      case '\u2657':
      case '\u265D':
        promoted = new Bishop(turn);
      break;
      case '\u2658':
      case '\u265E':
        promoted = new Knight(turn);
      break;
      default:
      break;
    }
    board[sRow][sCol] = promoted;
    board[pRow][pCol] = null;
    return board;
  }

  static checkCheck = (sRow, sCol, board) => {
    const thisPiece = board[sRow][sCol];
     const movesArr = thisPiece.movement(sRow, sCol, board);
     for (let i = 0, n = movesArr.length; i < n; i++) {
       const atkd = board[movesArr[i][0]][movesArr[i][1]];
       if (atkd && atkd !== 'enpassant' && atkd instanceof King && atkd.color !== thisPiece.color) {
           return true;
       }
     }
  }

  isCoordInArr = (coord, arr) => {
    for (let i = 0, n = arr.length; i < n; i++) {
      if (arr[i][0] === coord[0] && arr[i][1] === coord[1]) {
        return true;
      }
    }
    return false;
  }
}
export default Chess;
