import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import colors from '../styles/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface GoBackProps {
  size?: number;
}

export default function GoBack({size}: GoBackProps) {
  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[
        styles.container,
        {marginLeft: safeAreaInsets.left + 10, marginTop: safeAreaInsets.top},
      ]}>
      <MaterialCommunityIcons
        name={'arrow-left'}
        color={'#000'}
        size={size ?? 24}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginTop: 20,
    marginLeft: 10,
    zIndex: 1,
    padding: 5,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
});
