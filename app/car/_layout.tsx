import React from 'react';
import {Stack} from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name={'index'}
        options={{headerTitle: 'მანქანა', headerShown: false}}
      />
      <Stack.Screen
        name={'add'}
        options={{headerTitle: 'მანქანის დამატება', headerShown: false}}
      />
    </Stack>
  );
}
