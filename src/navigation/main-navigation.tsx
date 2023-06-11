import {NavigationContainer} from '@react-navigation/native';
import {LightTheme} from '../styles/themes';
import * as React from 'react';
import MainRouter from './stack-navigation';

const Navigation = () => (
  <NavigationContainer theme={LightTheme}>
    <MainRouter />
  </NavigationContainer>
);

export default Navigation;
