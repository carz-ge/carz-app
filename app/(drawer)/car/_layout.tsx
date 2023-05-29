import React from 'react';
import {Stack} from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name={'index'}
        options={{headerTitle: 'ავტომობილები', headerShown: false}}
      />
      <Stack.Screen
        name={'[carId]'}
        options={{headerTitle: 'ავტომობილი', headerShown: false}}
      />
    </Stack>
  );
}
