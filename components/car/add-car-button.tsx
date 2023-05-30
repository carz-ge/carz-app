import {Ionicons} from '@expo/vector-icons';
import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../../lib/styles/colors';
import {useRouter} from 'expo-router';

export default function AddCarButton() {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push('/car/add')} style={styles.addButton}>
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
