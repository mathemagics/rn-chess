import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, secureTextEntry, placeholder, keyboardType }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>

      <Text style={labelStyle}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={inputStyle}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        underlineColorAndroid='rgba(255, 255, 255, 0.0)'
        keyboardType={keyboardType || 'default'}

      />

    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    width: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
