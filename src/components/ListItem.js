import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { CardSection } from './common';

class ListItem extends Component {
  render() {
    const { uid } = this.props.game.creator;
    console.log('in list view', this.props.game);
    return (
      <View>
          <CardSection>
            <Text
              style={styles.textStyle}
            >
              {uid}
            </Text>
          </CardSection>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default ListItem;
