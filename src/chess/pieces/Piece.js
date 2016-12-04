class Piece {
    constructor(color) {
      this.possible_moves = [];
      this.color = color;
      this.initial = true;
    }
    isOnBoard(move) {
       return move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8;
    }
    isNotTeammate(move, piece) {
          return !this.isTeammate(move, piece);
      }
    isTeammate(move) {
        const r1 = move[0];
        const c1 = move[1];
        return (this.board[r1][c1] && this.board[r1][c1].color === this.color);
    }
    isEnemy(move) {
      const r1 = move[0];
      const c1 = move[1];
      return (this.board[r1][c1] && this.board[r1][c1].color !== this.color);
    }
    // checks if given square is ccoupied by enemy, friend, or empty and
    //  adds to array as necessary. return true if path blocked.
    checkSquare(row, col) {
      let blocked = true;
      if (this.isTeammate([row, col])) {
        console.log('why am i here?');
      } else if (this.isEnemy([row, col])) {
        this.possible_moves.push([row, col]);
      } else {
        this.possible_moves.push([row, col]);
        blocked = false;
      }
      return blocked;
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

export default Piece;
