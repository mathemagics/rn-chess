import firebase from 'firebase';

import { RECEIVE_MSG } from './types';

export const startChat = (gameId) => {
  return dispatch => {
    const ref = firebase.database().ref(`/messages/${gameId}`);
    const user = firebase.auth().currentUser;
    ref.off();
    ref.on('child_added', snapshot => {
      if (user.uid !== snapshot.val().user) {
        dispatch({
          type: RECEIVE_MSG,
          payload: snapshot.val()
        });
      }
    });
  };
};

export const sendMessage = (msg, gameId) => {
  return () => {
    const ref = firebase.database().ref(`/messages/${gameId}`);
    const key = ref.push();
    const user = firebase.auth().currentUser;
    const message = {
      text: msg,
      user: user.uid
    };
    key.set(message, (error) => {
      if (error) {
        console.log('failed to send msg');
      }
    });
  };
};
