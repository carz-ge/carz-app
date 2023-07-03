import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {LightTheme} from '../styles/themes';
import MainRouter from './stack-navigation';

function Navigation() {
  return (
    <NavigationContainer theme={LightTheme}>
      <MainRouter />
    </NavigationContainer>
  );
}

export default Navigation;
