import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import Chat from './Chat';
import Board from './Board';
import XLabel from './XLabel';
import YLabel from './YLabel';
import { CardSection, Notice } from './common';

class Game extends Component {

  renderNotice() {
    const { notice } = this.props;
    if (notice) {
      return (
        <CardSection>
          <Notice notice={notice} />
        </CardSection>
      );
    }
  }

  render() {
    const {
      chatViewStyle,
      gameViewStyle,
      cardStyle,
      dotStyle,
      boardStyle,
      activeDotStyle
    } = styles;

    return (
      <Swiper
        onMomentumScrollEnd={(e, state) => console.log('index:', state.index)}
        dot={<View style={dotStyle} />}
        activeDot={<View style={activeDotStyle} />}
        paginationStyle={{ top: -600 }}
        loop
      >
        <View style={gameViewStyle}>
            <View style={cardStyle}>
              <Text> Player1 </Text>
            </View>
            <View style={boardStyle}>
              <XLabel />
              <View style={{ flexDirection: 'row' }}>
                <YLabel />
                <Board />
                <YLabel />
              </View>
              <XLabel />
            </View>
            <View style={cardStyle}>
              <Text> Player2 </Text>
            </View>
              {this.renderNotice()}
        </View>

        <View style={chatViewStyle} >
          <Chat gameId={this.props.gameId} />
        </View>
      </Swiper>
    );
  }
}
const styles = {
  chatViewStyle: {
    flex: 1,
    backgroundColor: 'white',
    bottom: 100
  },
  gameViewStyle: {
    flex: 1,
    top: 90,
    alignSelf: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  cardStyle: {
    height: 60,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  boardStyle: {
      ...this.cardStyle,
      height: 343,
      flexDirection: 'column',
      borderRadius: 0,
      marginTop: 10,
      marginBottom: 10,
  },
  dotStyle: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 5,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  activeDotStyle: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
};

const mapStateToProps = ({ chess }) => {
  const { notice, gameId } = chess;
  return { notice, gameId };
};

export default connect(mapStateToProps, null)(Game);
