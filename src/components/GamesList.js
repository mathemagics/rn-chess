import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, ListView } from 'react-native';
import ActionButton from 'react-native-action-button';
import { gamesFetch, createGame } from '../actions';
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
      <View style={{ flex: 1, backgroundColor: '#ffffff', top: 100 }}>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
        <ActionButton
          buttonColor='#D63D29'
          onPress={this.pressCreateGame.bind(this)}
          offsetY={100}
        />
      </View>
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

export default connect(
  mapStateToProps,
  { gamesFetch, createGame })(GamesList);
