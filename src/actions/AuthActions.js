import { Actions } from 'react-native-router-flux';
import { Platform } from 'react-native';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';

import {
  EMAIL_CHANGED,
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  AVATAR_CHANGED,
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

export const avatarChanged = (text) => {
  return ({
    type: AVATAR_CHANGED,
    payload: text
  });
};

export const loginUser = ({ email, password, username, avatar }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_ATTEMPT });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user, username, avatar.uri))
      .catch((e) => {
        console.log(e);
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user, username, avatar.uri))
        .catch((err) => {
          console.log(err);
          loginUserFail(dispatch);
        });
      });
  };
};

const loginUserSuccess = (dispatch, user, username, avatar) => {
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.Blob = Blob;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  const sessionId = new Date().getTime();
  const storage = firebase.storage();
  const imageRef = storage.ref('images').child(`${sessionId}`);
  let uploadBlob = null;
  const uploadUri = Platform.OS === 'ios' ? avatar.replace('file://', '') : avatar;
  if (avatar) {
    fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: 'image/png;base64' });
        })
        .then((blob) => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: 'image/png' });
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then((url) => {
          console.log('url:', url);
          return user.updateProfile({ displayName: username, photoURL: url });
        })
        .then(() => {
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: user
          });
        })
        .catch((error) => {
          console.log('err:', error);
        });
  }

  user.updateProfile({ displayName: username, })
    .then(() => {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
      });
      Actions.main();
    });
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};
