import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChooseCarScreen from '../../screens/search/choose-car';
import PickDateTimeScreen from '../../screens/search/pick-date-time';
import {SearchStackParamList} from '../types';

const Stack = createNativeStackNavigator<SearchStackParamList>();

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="chooseCar"
        component={ChooseCarScreen}
        options={{title: '', headerBackVisible: true}}
      />
      <Stack.Screen
        name="pickDateTime"
        component={PickDateTimeScreen}
        options={{title: 'აირჩიე ჯავშნის დრო', headerBackVisible: true}}
        // Options={{headerBackVisible: true}}
      />
    </Stack.Navigator>
  );
}

export default SearchStack;
