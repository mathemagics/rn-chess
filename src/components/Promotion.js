import React from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import { CardSection } from './common';

const Promotion = ({ visible, color, onPress }) => {
  const knight = color === 'white' ? '\u2658' : '\u265E';
  const bishop = color === 'white' ? '\u2657' : '\u265D';
  const rook = color === 'white' ? '\u2656' : '\u265C';
  const queen = color === 'white' ? '\u2655' : '\u265B';
  const { containerStyle, textStyle, cardSectionStyle } = styles;
  const selectPieces = [knight, bishop, rook, queen].map((piece) => {
    return (
      <TouchableOpacity key={piece} onPress={onPress(piece)}>
        <CardSection style={cardSectionStyle}>
          <Text style={textStyle}>{piece}</Text>
        </CardSection>
      </TouchableOpacity>

    );
  });
  return (
    <Modal
      transparent
      visible={visible}
      animationType='fade'
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
          {selectPieces}
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }

};

export default Promotion;
