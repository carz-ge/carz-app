import React from 'react';
import {Stack} from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name={'[productId]'}
        options={{headerTitle: 'პროდუქტი', headerBackVisible: true}}
      />
    </Stack>
  );
}
