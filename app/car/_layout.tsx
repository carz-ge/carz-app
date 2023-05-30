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
        options={{headerTitle: 'მანქანის დამატება', headerBackVisible: true}}
      />
      <Stack.Screen
        name={'[carId]'}
        options={{headerTitle: 'ავტომობილი', headerBackVisible: true}}
      />
      <Stack.Screen
        name={'tech-card-qr-scan'}
        options={{
          headerTitle: 'დაასკანერე ტექ. პასპორტი',
          headerBackVisible: true,
        }}
      />
    </Stack>
  );
}
