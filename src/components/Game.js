import React, { Component } from 'react';
import { View } from 'react-native';
import Board from './Board';
import XLabel from './XLabel';

class Game extends Component {

  render() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <XLabel />
      <Board />
      <XLabel />
    </View>

    );
  }
}

export default Game;
