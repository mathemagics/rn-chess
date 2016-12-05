import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Square from './Square';
import { clickSquare, promotePawn } from '../actions';
import Promotion from './Promotion';

class Board extends Component {
  constructor(props) {
    super(props);
    this.drawBoard(this.props.board);
  }
  componentWillReceiveProps({ highlighted, board }) {
    this.drawBoard(board, highlighted);
  }
  drawBoard(chessBoard, highlighted) {
    const boardProps = {};
    this.board = {};
    for (let i = 0; i < 8; i++) {
     for (let j = 0; j < 8; j++) {
      const color = (i + j) % 2 !== 0 ? '#C98F55' : '#F0D9C2';
      const piece = chessBoard[i][j];
      const symbol = piece ? piece.code : '';
      const highlight = highlighted && highlighted.includes(`${i}${j}`);
      const loc = `${i}${j}`;
      // add onPress handler if 'turn' matches 'piece color'
      const pressFun = this.pressFunction(loc);
      boardProps[i] = boardProps[i] ? boardProps[i] : [];
      boardProps[i][j] = { loc, symbol, color, highlight, pressFun };
      }
    }
    for (let i = 0; i < 8; i++) {
      this.board[i] = boardProps[i].map(info => {
        const { color, loc, symbol, highlight, pressFun } = info;
         return (
           <Square
             key={loc}
             color={color}
             piece={symbol}
             highlight={highlight}
             onPress={pressFun}
           />
         );
      });
    }
  }

pressFunction(loc) {
  return () => {
    const { board, highlighted, prev, turn } = this.props;
    this.props.clickSquare(loc, board, highlighted, prev, turn);
  };
}

clickPromote(piece) {
  return () => {
    const { activeSq, board, turn } = this.props;
    this.props.promotePawn(activeSq, piece, board, turn);
  };
}

  render() {
    const { boardStyles } = styles;
    return (
      <View style={boardStyles}>
        <View style={{ flexDirection: 'row' }}>{this.board['7']}</View>
        <View style={{ flexDirection: 'row' }}>{this.board['6']}</View>
        <View style={{ flexDirection: 'row' }}>{this.board['5']}</View>
        <View style={{ flexDirection: 'row' }}>{this.board['4']}</View>
        <View style={{ flexDirection: 'row' }}>{this.board['3']}</View>
        <View style={{ flexDirection: 'row' }}>{this.board['2']}</View>
        <View style={{ flexDirection: 'row' }}>{this.board['1']}</View>
        <View style={{ flexDirection: 'row' }}>{this.board['0']}</View>
        <Promotion
          visible={this.props.promoting}
          color='white'
          onPress={this.clickPromote.bind(this)}
        />
      </View>
    );
  }
}

const styles = {
  boardStyles: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 2
  }
};

const mapStateToProps = ({ chess }) => {
  const { board, highlighted, prev, promoting, turn, activeSq } = chess;
  return { highlighted, board, prev, turn, promoting, activeSq };
};

export default connect(mapStateToProps, { clickSquare, promotePawn })(Board);
