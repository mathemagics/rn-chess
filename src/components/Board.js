import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Square from './Square';
import { clickSquare } from '../actions';

class Board extends Component {
  constructor(props) {
    super(props);
    this.drawBoard(this.props.board);
  }
  componentWillReceiveProps({ highlighted, board }) {
    this.drawBoard(board, highlighted);
  }
  drawBoard(chessBoard, highlighted) {
    console.log('highlighted:', highlighted);
    const boardProps = {};
    this.board = {};
    for (let i = 0; i < 8; i++) {
     for (let j = 0; j < 8; j++) {
      const color = (i + j) % 2 !== 0 ? '#C98F55' : '#F0D9C2';
      const piece = chessBoard[i][j] ? this.props.board[i][j].code : '';
      const highlight = highlighted && highlighted.includes(`${i}${j}`);
      boardProps[i] = boardProps[i] ? boardProps[i] : [];
      boardProps[i][j] = { loc: `${i}${j}`, piece, color, highlight };
      }
    }
    for (let i = 0; i < 8; i++) {
      this.board[i] = boardProps[i].map(info => {
        const { color, loc, piece, highlight } = info;
         return (
           <Square
             key={loc}
             color={color}
             loc={loc}
             piece={piece}
             highlight={highlight}
             onPress={this.pressFunction(loc)}
           />
         );
      });
    }
  }

pressFunction(loc) {
  return () => {
    const { board, highlighted, prev } = this.props;
    this.props.clickSquare(loc, board, highlighted, prev);
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
  const { board, highlighted, prev } = chess;
  return { highlighted, board, prev };
};

export default connect(mapStateToProps, { clickSquare })(Board);
