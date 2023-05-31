import React from 'react';
import {Stack} from 'expo-router';

export default function TabLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={'sign-in'}
        // options={{headerBackVisible: true}}
      />
      <Stack.Screen
        name={'authenticate'}
        // options={{headerBackVisible: true}}
      />
    </Stack>
  );
}
