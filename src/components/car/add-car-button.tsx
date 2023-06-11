import {Ionicons} from '@expo/vector-icons';
import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core/src/types';
import {RootStackParamList} from '../../navigation/types';

export default function AddCarButton() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('carStack', {
          screen: 'addCar',
        })
      }
      style={styles.addButton}>
      <Ionicons name="ios-add" size={30} color="#fff" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
