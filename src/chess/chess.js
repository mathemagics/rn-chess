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
    board[7][2] = new Bishop('black');
    board[7][3] = new Queen('black');
    board[7][4] = new King('black');
    board[7][5] = new Bishop('black');
    board[7][6] = new Knight('black');
    board[7][7] = new Rook('black');
    return (board);
  }

  movePiece = (sRow, sCol, newBoard) => {
    const board = newBoard;
    // checking if castle
    if (this.thisPiece.constructor.name === 'King' && this.thisPiece.initial) {
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
    } else if (this.thisPiece.constructor.name === 'Pawn') {
      // setting promotion:
      if (sRow === 7 || sRow === 0) {
        this.setPromotion();
        return;
      } else if (Math.abs(this.pCol - sCol) === 1 && !board[sRow][sCol]) {
        // removing attacked piece through en passant
      }
    }
    // setting real board
    board[sRow][sCol] = board[this.pRow][this.pCol];
    board[this.pRow][this.pCol] = null;

    // this.lastMove = { piece: this.thisPiece.constructor.name, pRow, pCol, sRow, sCol };
  }

  checkCheck = (sRow, sCol, board) => {
     const movesArr = board[sRow][sCol].movement(sRow, sCol);
     for (let i = 0, n = movesArr.length; i < n; i++) {
       const atkd = board[movesArr[i][0]][movesArr[i][1]];
       if (atkd && atkd instanceof King && atkd.color !== this.thisPiece.color) {
         console.log('CHECK!');
           return true;
       }
     }
  }

  // returns true if current move removes check
  // thisPiece is attacking piece from prow,pcol to srow,scol
  removeCheck = () => {
    const takenSpot = this.board[this.sRow][this.sCol];
    this.board[this.sRow][this.sCol] = this.board[this.pRow][this.pCol];
    this.board[this.pRow][this.pCol] = null;

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        // getting enemy pieces
        const atkr = this.board[i][j];
        if (atkr && atkr.color !== this.thisPiece.color) {
          const movesArr = atkr.movement(i, j);
          // checking if our king is in their movelist
          for (let k = 0, n = movesArr.length; k < n; k++) {
            const atkd = this.board[movesArr[k][0]][movesArr[k][1]];

            if (atkd && atkd instanceof King && atkd.color === this.thisPiece.color) {
              console.log('still in check');
              this.board[this.pRow][this.pCol] = this.board[this.sRow][this.sCol];
              this.board[this.sRow][this.sCol] = takenSpot;
              return false;
            }
          }
        }
      }
    }
    this.board[this.pRow][this.pCol] = this.board[this.sRow][this.sCol];
    this.board[this.sRow][this.sCol] = takenSpot;
    return true;
  }

  // after making a move that checks the enemy king.
  // we look to see if the enemy has an available move to remove checks
  // before switching turns
  checkCheckmate = (board) => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        // getting enemy pieces
        this.thisPiece = board[i][j];
        if (this.thisPiece && this.thisPiece.color !== this.turn) {
          const movesArr = this.thisPiece.movement(i, j);
          for (let k = 0, n = movesArr.length; k < n; k++) {
            this.pRow = i;
            this.pCol = j;
            this.sRow = movesArr[k][0];
            this.sCol = movesArr[k][1];
            if (this.removeCheck()) { return false; }
          }
        }
      }
    }
    return true;
  }

  // setPromotion = () => {
  //   promoting = true;
  //   cover = document.getElementById('cover');
  //   cover.style.display = 'block';
  //   document.getElementById('queen').onclick = function () {
  //     promote(this.id);
  //   };
  //   document.getElementById('knight').onclick = function () {
  //     promote(this.id);
  //   };
  //   document.getElementById('bishop').onclick = function () {
  //     promote(this.id);
  //   };
  //   document.getElementById('rook').onclick = function () {
  //     promote(this.id);
  //   };
  // }
  //
  // promote = id => {
  //   let promoted;
  //   switch (id) {
  //     case 'queen':
  //       promoted = new Queen(turn);
  //     break;
  //     case 'rook':
  //       promoted = new Rook(turn);
  //     break;
  //     case 'bishop':
  //       promoted = new Bishop(turn);
  //     break;
  //     case 'knight':
  //       promoted = new Knight(turn);
  //     break;
  //     default:
  //     break;
  //   }
  //   board[sRow][sCol] = promoted;
  //   board[pRow][pCol] = null;
  //   table.rows[sRow].cells[sCol].innerHTML = promoted.code;
  //   table.rows[pRow].cells[pCol].innerHTML = '';
  //   cover.style.display = 'none';
  //   promoting = false;
  //   if (checkCheck()) {
  //     check = true;
  //     if (checkCheckmate()) {
  //       endGame();
  //     }
  //   }
  //   reset();
  // }

  processMove = () => {
    this.resetColors(this.pRow, this.pCol);
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

  reset = () => {
    this.availMoves = [];
    this.thisPiece.initial = false;
    this.thisPiece = null;
    this.turn = this.turn === 'white' ? 'black' : 'white';
  }

}
export default Chess;
