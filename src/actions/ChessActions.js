// import firebase from 'firebase';
// import { Actions } from 'react-native-router-flux';

import { CLICK_SQUARE } from './types';

export const clickSquare = (sq) => {
  return {
    type: CLICK_SQUARE,
    payload: sq
  };
};
