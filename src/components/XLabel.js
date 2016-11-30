import React, { Component } from 'react';
import { Text, View } from 'react-native';

class XLabel extends Component {
  render() {
    const { textStyles, containerStyles } = styles;
    const vals = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const letters = vals.map((letter) => {
      return <Text key={letter} style={textStyles}>{letter}</Text>;
    });

    return (
      <View style={containerStyles}>
        {letters}
      </View>

    );
  }
}

const styles = {
  textStyles: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  containerStyles: {
    height: 30,
    width: 350,
    paddingLeft: 42,
    paddingRight: 20,
    flexDirection: 'row',
    backgroundColor: '#1A3461'
  }
};

export default XLabel;
