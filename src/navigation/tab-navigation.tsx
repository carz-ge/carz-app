import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import Bookings from '../screens/bookings';
import {MainTabParamList} from './types';
import MapScreen from '../screens/map/map-screen';
import {View} from 'react-native';
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabsNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons size={28} name="home" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="map"
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({focused, color}) => (
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 17,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: focused ? color : 'white',
              }}>
              <FontAwesome5 size={20} name={'map'} color={color} />
            </View>
          ),
          tabBarIconStyle: {},
        }}
        component={MapScreen}
      />
      <Tab.Screen
        name="bookings"
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              size={28}
              name="clock-time-four"
              color={color}
            />
          ),
        }}
        component={Bookings}
      />
    </Tab.Navigator>
  );
}
