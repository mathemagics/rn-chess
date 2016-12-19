import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import Router from './Router';
import reducers from './reducers';

console.disableYellowBox = true;

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyC-KoPLoQktHQLST4bpHbQrKD0Yw1Ry3z4',
      authDomain: 'rnchess-6ab60.firebaseapp.com',
      databaseURL: 'https://rnchess-6ab60.firebaseio.com',
      storageBucket: 'rnchess-6ab60.appspot.com',
      messagingSenderId: '810097622106'
    };
    firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
