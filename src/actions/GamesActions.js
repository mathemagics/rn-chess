import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  GAMES_FETCH_SUCCESS,
} from './types';

export const gamesFetch = () => {
  return (dispatch) => {
    const ref = firebase.database().ref('/games');
    const openGames = ref.orderByChild('state').equalTo(1);
    openGames.on('value', snapshot => {
      dispatch({ type: GAMES_FETCH_SUCCESS, payload: snapshot.val() });
    });
    ref.on('child_changed', snapshot => {
        const user = firebase.auth().currentUser;
        const { creator, joiner } = snapshot.val();
        if (creator.uid === user.uid && joiner) {
          Actions.game();
        }
    });
  };
};

export const joinGame = (gameId) => {
  return () => {
    const user = firebase.auth().currentUser;
    const ref = firebase.database().ref('/games/');
    ref.child(gameId).transaction(game => {
      console.log('game', game);
      if (!game.joiner) {
        game.state = 2;
        game.joiner = {
            uid: user.uid,
        };
        return game;
      }
    });
    Actions.game();
  };
};

export const createGame = () => {
  return () => {
    const user = firebase.auth().currentUser;
    const ref = firebase.database().ref('/games');
    const key = ref.push();
    const currentGame = {
            creator: {
                uid: user.uid,
            },
            state: 1
        };
    console.log('creating game');
    key.set(currentGame, (error) => {
            if (error) {
                console.log('error creating game.', error);
            } else {
                //drop this game, if cseator disconnecta
                key.onDisconnect().remove();
            }
        });
  };
};
