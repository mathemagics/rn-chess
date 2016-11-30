import React, { Component } from 'react';
import { View } from 'react-native';
import Board from './Board';
import XLabel from './XLabel';
import YLabel from './YLabel';
import { Card, CardSection } from './common';

class Game extends Component {

  render() {
  return (
    <Card>
      <CardSection>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <XLabel />
          <View style={{ flexDirection: 'row' }}>
            <YLabel />
            <Board />
            <YLabel />
          </View>

          <XLabel />
        </View>
      </CardSection>
    </Card>

    );
  }
}

export default Game;
