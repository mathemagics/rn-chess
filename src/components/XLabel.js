import React, { Component } from 'react';
import { Text, View } from 'react-native';

class XLabel extends Component {
  componentWillMount() {
    const { textStyles } = styles;
    const vals = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    this.textVals = vals.map((letter) => {
      return <Text key={letter} style={textStyles}>{letter}</Text>;
    });
  }
  render() {
    const { containerStyles } = styles;
    return (
      <View style={containerStyles}>
        {this.textVals}
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
    height: 28,
    width: 336,
    paddingLeft: 42,
    paddingRight: 20,
    flexDirection: 'row',
    backgroundColor: '#1A3461'
  }
};

export default XLabel;
