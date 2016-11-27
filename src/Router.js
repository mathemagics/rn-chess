import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import PlayerList from './components/PlayerList';

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
          key='playerList'
          component={PlayerList}
          title="Players LFG"
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
