import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { joinGame } from '../actions';

class ListItem extends Component {

  onRowPress() {
    this.props.joinGame(this.props.game.gameId);
  }
  renderAvatar() {
    const { uImg } = this.props.game.creator;
    let src = 'https://i.ytimg.com/vi/h288al3d4dg/maxresdefault.jpg';
    if (uImg) {
      src = uImg;
    }
      return (
          <Image
            source={{ uri: src }}
            style={{ paddingLeft: 15, height: 50, width: 50 }}
          />
      );
  }
  render() {
    const { containerStyle } = styles;
    const { textStyle } = styles;
    const { username } = this.props.game.creator;
    return (
      <TouchableOpacity onPress={this.onRowPress.bind(this)}>
        <View style={containerStyle}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
              {this.renderAvatar()}
              <Text style={{ ...textStyle, color: '#D63D29' }}>
                {username}
              </Text>
              <Text style={textStyle}>
                awaits an opponent!
              </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  containerStyle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 60,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3
  },
  textStyle: {
    color: '#143D73',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingLeft: 12
  }
};

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};

export default connect(mapStateToProps, { joinGame })(ListItem);
