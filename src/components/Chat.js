import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { startChat, sendMessage } from '../actions';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.onSend = this.onSend.bind(this);
  }
  componentWillMount() {
    this.props.startChat(this.props.gameId);
  }
  componentWillReceiveProps(nextProps) {
    const { text, user } = nextProps.message;
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: user,
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        }),
      };
    });
  }
  onSend(messages = []) {
    console.log('messages', messages);
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
    this.props.sendMessage(messages[0].text, this.props.gameId);
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

const mapStateToProps = ({ chat }) => {
  const { message } = chat;
  return { message };
};

export default connect(mapStateToProps, { startChat, sendMessage })(Chat);
