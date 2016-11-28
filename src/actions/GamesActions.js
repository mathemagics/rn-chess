import firebase from 'firebase';

import {
  GAMES_FETCH_SUCCESS,
} from './types';

export const gamesFetch = () => {
  return (dispatch) => {
    const ref = firebase.database().ref('/games');
    const openGames = ref.orderByChild('state').equalTo(1);
    openGames.on('value', snapshot => {
      console.log('onvalue');
      dispatch({ type: GAMES_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const createGame = () => {
  return (dispatch) => {
    const user = firebase.auth().currentUser;
    const ref = firebase.database().ref('/games');
    const currentGame = {
            creator: {
                uid: user.uid,
            },
            state: 1
        };
    console.log('creating game');
    const key = ref.push();
    key.set(currentGame, (error) => {
            if (error) {
                console.log('error creating game.', error);
            } else {
                //disable access to joining other games
                // console.log('created game!', key);
                //drop this game, if I disconnect
                key.onDisconnect().remove();
                // watchGame(key.key);
            }
        });
  };
};
