import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CarStackParamList} from '../types';
import AddCarScreen from '../../screens/car/add';
import CarScreen from '../../screens/car/car';
import TechPassportQrScannScreen from '../../screens/car/tech-card-qr-scan';

const Stack = createNativeStackNavigator<CarStackParamList>();

const CarStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={'addCar'}
        options={{headerTitle: 'მანქანის დამატება', headerBackVisible: true}}
        component={AddCarScreen}
      />
      <Stack.Screen
        name={'car'}
        options={{headerTitle: 'ავტომობილი', headerBackVisible: true}}
        component={CarScreen}
      />
      <Stack.Screen
        name={'techCardQrScan'}
        options={{
          headerTitle: 'დაასკანერე ტექ. პასპორტი',
          headerBackVisible: true,
        }}
        component={TechPassportQrScannScreen}
      />
    </Stack.Navigator>
  );
};

export default CarStack;
