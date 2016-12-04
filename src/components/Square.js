import React from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';

const Square = (props) => {
  const { squareStyles, pieceStyles } = styles;
    return (
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View
          style={{
            ...squareStyles,
            backgroundColor: props.highlight ? 'green' : props.color }}
        >
          <Text style={pieceStyles}>{props.piece}</Text>
        </View>

      </TouchableWithoutFeedback>
    );
};

const styles = {
  pieceStyles: {
    textAlign: 'center',
    fontSize: 34,
    color: 'black',
    alignSelf: 'center',
    lineHeight: 38
  },
  squareStyles: {
    height: 35,
    width: 35,
    borderColor: 'black',
    borderWidth: 1,
    overflow: 'hidden'
  }
};

export default Square;
