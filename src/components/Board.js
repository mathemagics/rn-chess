import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Square from './Square';
import { startGame } from '../actions';

class Board extends Component {
  componentWillMount() {
    this.props.startGame();
    this.boardProps = {};
    this.board = {};
    for (let i = 0; i < 8; i++) {
     for (let j = 0; j < 8; j++) {
      const color = (i + j) % 2 !== 0 ? 'black' : 'white';
      this.boardProps[i] = this.boardProps[i] ? this.boardProps[i] : [];
      this.boardProps[i][j] = { loc: `${i}${j}`, color };
      }
    }
    for (let i = 0; i < 8; i++) {
      this.board[i] = this.boardProps[i].map(info => {
        const { color, loc } = info;
         return <Square key={loc} color={color} loc={loc} />;
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
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
  const { board, highlighted } = chess;
  console.log('mstp board:', board, ' highlighted:', highlighted);
  return { highlighted, board };
};

export default connect(mapStateToProps, { startGame })(Board);
