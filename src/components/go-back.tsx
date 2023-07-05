import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import colors from '../styles/colors';

interface GoBackProps {
  size?: number | undefined;
}

export default function GoBack({size}: GoBackProps) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.container}>
      <MaterialCommunityIcons
        name={'arrow-left'}
        color={'#000'}
        size={size || 24}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    zIndex: 1,
    padding: 5,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
});
