import React, { Component } from 'react';
import { Text, View } from 'react-native';

class YLabel extends Component {
  componentWillMount() {
    const { textStyles } = styles;
    const vals = ['1', '2', '3', '4', '5', '6', '7', '8'];
    this.textVals = vals.map(val => {
      return <Text key={val} style={textStyles}>{val}</Text>;
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
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  containerStyles: {
    paddingTop: 12,
    height: 292,
    width: 26,
    flexDirection: 'column',
    backgroundColor: '#1A3461'
  }
};
export default YLabel;
