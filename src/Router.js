import React from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';

const RouterComponent = () => {
  return (

    <Router scenestyle={{ paddingTop: 65 }}>
      <Scene key='auth'>
        <Scene key='login' component={LoginForm} title="Please Login" initial />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
