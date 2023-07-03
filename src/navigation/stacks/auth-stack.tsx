import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../../screens/auth/sign-in';
import Authenticate from '../../screens/auth/authenticate';
import {AuthStackParamList} from '../types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="signIn"
        component={SignIn}
        // Options={{headerBackVisible: true}}
      />
      <Stack.Screen
        name="authenticate"
        component={Authenticate}
        // Options={{headerBackVisible: true}}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
