import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, ListView, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import { gamesFetch, createGame } from '../actions';
import { Button, CardSection } from './common';
import ListItem from './ListItem';

class GamesList extends Component {

  componentWillMount() {
    //get list of available games
    this.props.gamesFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    //this.props is still the old props
    this.createDataSource(nextProps);
  }

  createDataSource({ games }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(games);
  }

  pressCreateGame() {
    this.props.createGame();
  }

  renderRow(game) {
    return <ListItem game={game} />;
  }

  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons>
        <View>
          <CardSection>
            <ListView
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={this.renderRow}
            />
          </CardSection>
          <CardSection>
            <Button
              onPress={this.pressCreateGame.bind(this)}
            >
              New Game
            </Button>
          </CardSection>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
    );
  }
}
const mapStateToProps = state => {
  //convert our returned object into an array
  const games = _.map(state.games, (val, gameId) => {
        return { ...val, gameId };
    });
    // returned format:
    // [ { creator: { uid: uid }, state: number}, gameId: gameId } ... ]
    return { games };
};

const styles = {
  wrapper: {
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
    bottom: 100
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
};

export default connect(
  mapStateToProps,
  { gamesFetch, createGame })(GamesList);
