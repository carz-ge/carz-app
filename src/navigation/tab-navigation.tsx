import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import Bookings from '../screens/bookings';
import TabBarIcon from '../components/tab-bar-icon';
import {MainTabParamList} from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabsNavigation() {
  return (
    <Tab.Navigator
      screenOptions={
        {
          // TabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        }
      }>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({color}) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="bookings"
        options={{
          tabBarLabel: 'Bookings',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <TabBarIcon name="clock-time-four" color={color} />
          ),
        }}
        component={Bookings}
      />
    </Tab.Navigator>
  );
}
