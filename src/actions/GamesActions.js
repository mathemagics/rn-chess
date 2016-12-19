import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  GAMES_FETCH_SUCCESS,
  RECEIVE_MOVE,
  SET_GAME
} from './types';

export const gamesFetch = () => {
  return (dispatch) => {
    const ref = firebase.database().ref('/games');
    const openGames = ref.orderByChild('state').equalTo(1);
    openGames.on('value', snapshot => {
        dispatch({ type: GAMES_FETCH_SUCCESS, payload: snapshot.val() });
      });
        ref.on('child_changed', snap => {
        const user = firebase.auth().currentUser;
        const { creator, joiner } = snap.val();
        if (creator.uid === user.uid && joiner) {
          openGames.off('value', snapshot => {
              dispatch({ type: GAMES_FETCH_SUCCESS, payload: snapshot.val() });
          });
          const game = firebase.database().ref(`/games/${snap.key}/moves`);
          game.once('value', () => {
            console.log('creator: value:', user.side);
            dispatch({ type: SET_GAME, payload: { id: snap.key, color: user.side } });
          });
          game.on('child_added', snapshot => {
            console.log('creator: child added');
            dispatch({ type: RECEIVE_MOVE, payload: snapshot.val() });
          });
          ref.off();
          openGames.off();
          Actions.game({ gameId: snap.key });
        }
    });
  };
};

export const createGame = () => {
  return () => {
    const user = firebase.auth().currentUser;
    user.side = Math.random < 0.5 ? 'white' : 'black';
    const ref = firebase.database().ref('/games');
    const key = ref.push();
    const currentGame = {
            creator: {
                uImg: user.photoURL,
                uid: user.uid,
                username: user.displayName,
                side: user.side
            },
            state: 1
        };
    key.set(currentGame, (error) => {
            if (error) {
                console.log('error creating game.', error);
            } else {
                //drop this game, if creator disconnects
                key.onDisconnect().remove();
            }
        });
  };
};

export const joinGame = (gameId) => {
  return (dispatch) => {
    const user = firebase.auth().currentUser;
    const ref = firebase.database().ref('/games/');
    ref.child(gameId).transaction(game => {
      if (!game.joiner) {
        user.side = game.creator.side === 'white' ? 'black' : 'white';
        game.state = 2;
        game.joiner = {
            uImg: user.photoURL,
            uid: user.uid,
            username: user.displayName,
            side: user.side
        };
        return game;
      }
    });
    const openGames = ref.orderByChild('state').equalTo(1);
      const game = firebase.database().ref(`/games/${gameId}/moves`);
      game.once('value', () => {
        console.log('value changed: setting game');
        dispatch({ type: SET_GAME, payload: { id: gameId, color: user.side } });
      });
      game.on('child_added', snapshot => {
        console.log('move child added');
        dispatch({ type: RECEIVE_MOVE, payload: snapshot.val() });
      });
      ref.off();
      openGames.off();
      Actions.game({ gameId });
  };
};
