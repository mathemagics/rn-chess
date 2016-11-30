import React, { Component } from 'react';
import { View } from 'react-native';

class Square extends Component {

  render() {
    const backgroundColor = this.props.color === 'black' ? '#C98F55' : '#F0D9C2';
    return (
      <View
      style={{
        height: 36,
        width: 36,
        backgroundColor
      }}
      />
    );
  }
}

export default Square;
