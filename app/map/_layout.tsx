import React from 'react';
import {Stack} from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name={'result'}
        options={{headerTitle: 'რუკა', headerBackVisible: true}}
      />
    </Stack>
  );
}
