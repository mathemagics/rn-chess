import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import GamesList from './components/GamesList';
import Game from './components/Game';

const RouterComponent = () => {
  return (

    <Router
      sceneStyle={{ paddingTop: 85 }}
      hideNavBar={false}
      navigationBarStyle={{
        backgroundColor: 'white',
        borderBottomColor: 'transparent',
        borderBottomWidth: 65 }}
      titleStyle={{ color: '#1A3461', fontWeight: '700' }}
    >
      <Scene key='auth'>
        <Scene
          key='login'
          component={LoginForm}
          title="Please Login"
          initial
          sceneStyle={{ backgroundColor: 'white' }}
        />
      </Scene>

      <Scene key="main" sceneStyle={{ border: 0 }}>
        <Scene
          initial
          key='gamesList'
          component={GamesList}
          title="Open Games"
          sceneStyle={{ backgroundColor: 'white' }}
        />
        <Scene
          key='game'
          component={Game}
          title="Play!"
          sceneStyle={{ backgroundColor: 'white' }}
          renderBackButton={false}
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
