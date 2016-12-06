import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Board from './Board';
import XLabel from './XLabel';
import YLabel from './YLabel';
import { Card, CardSection, Notice } from './common';

class Game extends Component {

  renderNotice() {
    const { notice } = this.props;
    if (notice) {
      return (
        <Notice notice={notice} />
      );
    }
  }

  render() {
  return (
    <Card>
      <CardSection>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',


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
      {this.renderNotice()}
    </Card>

    );
  }
}

const mapStateToProps = ({ chess }) => {
  const { notice } = chess;
  return { notice };
};

export default connect(mapStateToProps, null)(Game);
