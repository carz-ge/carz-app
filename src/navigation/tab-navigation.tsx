import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/(drawer)/(tabs)/home';
import Bookings from '../screens/(drawer)/(tabs)/bookings';
import TabBarIcon from '../components/tab-bar-icon';
import {TabParamList} from './types';

const Tab = createBottomTabNavigator<TabParamList>();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={
        {
          // TabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        }
      }>
      <Tab.Screen
        name="home"
        component={Home}
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

export default Tabs;
