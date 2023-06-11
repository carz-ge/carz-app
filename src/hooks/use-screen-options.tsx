import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Entypo} from '@expo/vector-icons';

export const ScreenOptions = (title: string): NativeStackNavigationOptions => {
  const {goBack} = useNavigation();

  return {
    headerShown: true,
    headerShadowVisible: false,
    title,
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontFamily: 'FiraGO-Bold',
      fontSize: 16,
      color: '#000',
    },
    headerLeft: () => (
      <TouchableOpacity onPress={goBack}>
        <Entypo name="chevron-left" size={20} color={'#000'} />
      </TouchableOpacity>
    ),
  };
};
