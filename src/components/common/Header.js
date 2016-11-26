import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
  const { textStyle, viewStyle } = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}> {props.headerText} </Text>
    </View>
  );
};

const styles = {
  textStyle: {
    fontFamily: 'Verdana',
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    textShadowColor: '#333',
    textShadowOffset: { width: 2, height: 2 },
  },
  viewStyle: {
    backgroundColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    elevation: 2,
    position: 'relative'
  }
};

export { Header };
