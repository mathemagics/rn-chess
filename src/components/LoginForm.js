import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, usernameChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

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
    const { email, password, username } = this.props;
    this.props.loginUser({ email, password, username });
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
    return (
      <Card>
        <CardSection>
          <Input
            value={this.props.email}
            label='email'
            placeholder='email@email.com'
            onChangeText={this.onEmailChange.bind(this)}
            keyBoardType='email-address'
          />
        </CardSection>
        <CardSection>
          <Input
            value={this.props.username}
            label='username'
            placeholder='username'
            onChangeText={this.onUsernameChange.bind(this)}
          />
        </CardSection>
        <CardSection>
          <Input
            value={this.props.password}
            label='password'
            onChangeText={this.onPasswordChange.bind(this)}
            secureTextEntry
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
        <CardSection>
          {/* show spinner if loading, otherwise button */}
          {this.renderLoginButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyles: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, username, password, loading, errors } = auth;
  return { email, username, password, loading, errors };
};


export default connect(mapStateToProps, {
   emailChanged, passwordChanged, usernameChanged, loginUser
 })(LoginForm);
