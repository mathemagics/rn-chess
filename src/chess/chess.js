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
    const thisPiece = board[pRow][pCol];
    // checking if castle
    if (thisPiece.constructor.name === 'King' && thisPiece.initial) {
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
    } else if (thisPiece.constructor.name === 'Pawn') {
      // setting promotion:
      if (sRow === 7 || sRow === 0) {
        return { response: 'promote', nextBoard: board };
      } else if (Math.abs(pCol - sCol) === 1 && !board[sRow][sCol]) {
        // removing attacked piece through en passant
      }
    }
    // setting real board
    board[sRow][sCol] = board[pRow][pCol];
    board[pRow][pCol] = null;
    return { response: 'move', nextBoard: board };
    // this.lastMove = { piece: this.thisPiece.constructor.name, pRow, pCol, sRow, sCol };
  }

  static checkCheck(sRow, sCol, board) {
     const movesArr = board[sRow][sCol].movement(sRow, sCol);
     for (let i = 0, n = movesArr.length; i < n; i++) {
       const atkd = board[movesArr[i][0]][movesArr[i][1]];
       if (atkd && atkd instanceof King && atkd.color !== this.thisPiece.color) {
         console.log('CHECK!');
           return true;
       }
     }
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
        if (atkr && atkr.color !== checkColor) {
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


  static setPromotion(sRow, sCol, piece, board, turn) {
    let promoted;
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
    return board;
    // promoting = false;
    // if (this.checkCheck()) {
    //   check = true;
    //   if (this.checkCheckmate()) {
    //     endGame();
    //   }
    // }
    // reset();
  }

  static checkCheck = (sRow, sCol, board) => {
    const thisPiece = board[sRow][sCol];
     const movesArr = thisPiece.movement(sRow, sCol, board);
     for (let i = 0, n = movesArr.length; i < n; i++) {
       const atkd = board[movesArr[i][0]][movesArr[i][1]];
       if (atkd && atkd instanceof King && atkd.color !== thisPiece.color) {
           return true;
       }
     }
  }

  processMove = () => {
    if (!this.check || this.removeCheck()) {
      this.movePiece();
      if (!this.promoting) {
        if (this.checkCheck()) {
          this.check = true;
          if (this.checkCheckmate()) {
            this.endGame();
          }
        }
        this.reset();
      }
    }
  }

  getMoves = (sRow, sCol) => {
    //  if clicked square is not in availMoves, set new availMoves
    if (!this.isCoordInArr([sRow, sCol], this.availMoves)) {
      // choosing your own piece
      const aPiece = this.board[sRow][sCol];
      if (aPiece && aPiece.color === this.turn) {
        return aPiece.movement(sRow, sCol, this.board);
      }
      //setting previous position
      this.pRow = sRow;
      this.pCol = sCol;
    } else {
      console.log('here3');
      // this.processMove();
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
