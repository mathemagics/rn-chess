import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import { Kohana } from 'react-native-textinput-effects';
import {
  emailChanged,
  passwordChanged,
  usernameChanged,
  loginUser,
  avatarChanged,
 } from '../actions';
import { Button, Spinner } from './common';

class LoginForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  onUsernameChange(text) {
    this.props.usernameChanged(text);
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onLoginPress() {
    const { email, password, username, avatar } = this.props;
    this.props.loginUser({ email, password, username, avatar });
  }
  pickImage() {
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        const uri = `data:image/jpeg;base64, ${response.data}`;
        let source = { uri, isStatic: true };

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          source = { uri: response.uri.replace('file://', ''), isStatic: true };
        } else {
          source = { uri: response.uri, isStatic: true };
        }
        this.props.avatarChanged(source);
      }
    });
  }

  renderAvatar() {
    if (this.props.avatar) {
      console.log('render avatar:', this.props.avatar);
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 30 }}
            name="photo-camera"
            size={22}
            color="#D63D29"
          />
          <Image
            source={this.props.avatar}
            style={{ borderRadius: 500, height: 50, width: 50 }}
          />
        </View>
      );
    }
    return (
        <Text style={styles.textStyle}> avatar </Text>
    );
  }
  renderLoginButton() {
    if (this.props.loading) {
      return (
        <Spinner size="large" />
      );
    }
      return (
        <Button onPress={this.onLoginPress.bind(this)} >
          Sign In
        </Button>
      );
  }

  render() {
    const textColor = '#143D73';
    const iconColor = '#D63D29';
    const inputBackground = '#FFFFFF';

    const { inputStyle } = styles;
    return (
      <View style={{ top: 120, flex: 1, flexDirection: 'column' }}>
        <View style={inputStyle}>
          <Kohana
            style={{ backgroundColor: inputBackground }}
            label={'email'}
            iconClass={Icon}
            iconName={'mail'}
            iconColor={iconColor}
            labelStyle={{ color: textColor }}
            inputStyle={{ color: textColor }}
            onChangeText={this.onEmailChange.bind(this)}
            keyBoardType='email-address'
          />
        </View>
        <View style={inputStyle}>
          <Kohana
            style={{ backgroundColor: inputBackground }}
            label={'username'}
            iconClass={Icon}
            iconName={'face'}
            iconColor={iconColor}
            labelStyle={{ color: textColor }}
            inputStyle={{ color: textColor }}
            onChangeText={this.onUsernameChange.bind(this)}
          />
        </View>
        <View style={inputStyle}>
          <Kohana
            style={{ backgroundColor: inputBackground }}
            label={'password'}
            iconClass={Icon}
            iconName={'lock'}
            iconColor={iconColor}
            labelStyle={{ color: textColor }}
            inputStyle={{ color: textColor }}
            onChangeText={this.onPasswordChange.bind(this)}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={{ ...inputStyle, marginBottom: 30 }}
          onPress={this.pickImage.bind(this)}
        >
          {this.renderAvatar()}
        </TouchableOpacity>
        <View style={{ height: 45 }}>
          {/* show spinner if loading, otherwise button */}
          {this.renderLoginButton()}
        </View>
      </View>
    );
  }
}

const options = {
  title: 'Select Avatar',
  customButtons: [
    { name: 'avatar', title: 'Choose Photo' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
const styles = {
  inputStyle: {
    height: 60,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,

    elevation: 1,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
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
  const { email, username, password, avatar, loading, errors } = auth;
  return { email, username, password, avatar, loading, errors };
};


export default connect(mapStateToProps, {
   emailChanged, passwordChanged, usernameChanged, avatarChanged, loginUser
 })(LoginForm);
