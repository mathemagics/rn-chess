import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import GamesList from './components/GamesList';
import Game from './components/Game';

const RouterComponent = () => {
  return (

    <Router sceneStyle={{ paddingTop: 65 }}>

      <Scene key='auth'>
        <Scene
          key='login'
          component={LoginForm}
          title="Please Login"
          initial
        />
      </Scene>

      <Scene key="main">
        <Scene
          initial
          key='gamesList'
          component={GamesList}
          title="Open Games"
        />
        <Scene
          key='game'
          component={Game}
          title="Play!"
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
