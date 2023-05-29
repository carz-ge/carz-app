import React from 'react';
import {Stack} from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name={'pick-date-time'}
        options={{headerTitle: 'აირჩიე დრო', headerBackVisible: true}}
      />
      <Stack.Screen
        name={'[categoryId]'}
        options={{headerTitle: 'ძიება', headerBackVisible: true}}
      />
    </Stack>
  );
}
