import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CarStackScreenProps} from '../../navigation/types';

export default function CarScreen(props: CarStackScreenProps<'car'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
