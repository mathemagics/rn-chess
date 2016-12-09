import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import Chat from './Chat';
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
    <Swiper
      style={styles.wrapper}
      onMomentumScrollEnd={(e, state) => console.log('index:', state.index)}
      dot={<View
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          width: 5,
          height: 5,
          borderRadius: 4,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 3,
          marginBottom: 3
        }}
      />}
      activeDot={<View
        style={{
        backgroundColor: '#000',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3 }}
      />}
      paginationStyle={{ top: -600 }}
      loop
    >
      <View style={{ top: 90 }}>
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
      </View>

      <View style={styles.slide3} >
        <Chat gameId={this.props.gameId} />
      </View>
    </Swiper>
    );
  }
}
const styles = {
  wrapper: {
  },
  slide3: {
    flex: 1,
    backgroundColor: 'white',
    bottom: 100
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
};

const mapStateToProps = ({ chess }) => {
  const { notice, gameId } = chess;
  return { notice, gameId };
};

export default connect(mapStateToProps, null)(Game);
