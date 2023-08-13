import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ActiveBookingsScreen from '../screens/bookings/active-bookings';
import PastBookingsScreen from '../screens/bookings/past-bookings';
import {ParamListBase} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from './types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
export interface BookingsTopTabsParamList extends ParamListBase {
  activeBookings: undefined;
  pastBookings: undefined;
}

export type BookingsTopTabsStackScreenProps<
  T extends keyof RootStackParamList,
> = BottomTabScreenProps<BookingsTopTabsParamList, T>;
const Tab = createMaterialTopTabNavigator<BookingsTopTabsParamList>();

export default function BookingsTopTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: insets.top,
        },
      }}>
      <Tab.Screen
        name="activeBookings"
        options={{
          tabBarLabel: 'აქტიური',
        }}
        component={ActiveBookingsScreen}
      />
      <Tab.Screen
        name="pastBookings"
        options={{
          tabBarLabel: 'ძველი',
        }}
        component={PastBookingsScreen}
      />
    </Tab.Navigator>
  );
}
