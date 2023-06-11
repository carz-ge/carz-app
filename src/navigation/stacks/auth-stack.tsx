import React from 'react';
import SignIn from '../../screens/auth/sign-in';
import Authenticate from '../../screens/auth/authenticate';
import {AuthStackParamList} from '../types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={'signIn'}
        component={SignIn}
        // options={{headerBackVisible: true}}
      />
      <Stack.Screen
        name={'authenticate'}
        component={Authenticate}
        // options={{headerBackVisible: true}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
