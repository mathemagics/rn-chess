import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, } from 'react-native';
import { gamesFetch, createGame } from '../actions';
import { Button, CardSection } from './common';

class GamesList extends Component {

  componentWillMount() {
    //get list of available games
    this.props.gamesFetch();
  }

  pressCreateGame() {
    this.props.createGame();
  }

  render() {
    return (
      <View>
        <Text>
          Player1
        </Text>
        <Text>
          Player1
        </Text>
        <Text>
          Player1
        </Text>
        <Text>
          Player1
        </Text>
        <CardSection>
          <Button
            onPress={this.pressCreateGame.bind(this)}
          >
            New Game
          </Button>
        </CardSection>
      </View>
    );
  }
}
const mapStateToProps = ({ games }) => {
  return { games };
};

export default connect(
  mapStateToProps,
  { gamesFetch, createGame })(GamesList);
