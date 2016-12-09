import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { CardSection } from './common';
import { joinGame } from '../actions';

class ListItem extends Component {

  onRowPress() {
    this.props.joinGame(this.props.game.gameId);
  }
  render() {
    const { username } = this.props.game.creator;
    return (
      <TouchableOpacity onPress={this.onRowPress.bind(this)}>
        <View>
            <CardSection>
              <Text
                style={styles.textStyle}
              >
                {username}
              </Text>
            </CardSection>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default connect(null, { joinGame })(ListItem);
