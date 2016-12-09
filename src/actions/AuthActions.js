import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

import {
  EMAIL_CHANGED,
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_ATTEMPT,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from './types';

export const emailChanged = (text) => {
  return ({
    type: EMAIL_CHANGED,
    payload: text
  });
};

export const usernameChanged = (text) => {
  return ({
    type: USERNAME_CHANGED,
    payload: text
  });
};

export const passwordChanged = (text) => {
  return ({
    type: PASSWORD_CHANGED,
    payload: text
  });
};

export const loginUser = ({ email, password, username }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_ATTEMPT });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((e) => {
        console.log(e);
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user, username))
        .catch((err) => {
          console.log(err);
          loginUserFail(dispatch);
        });
      });
  };
};

const loginUserSuccess = (dispatch, user, username) => {
  user.updateProfile({ displayName: username });
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.main();
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};
