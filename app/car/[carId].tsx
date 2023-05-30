import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default function CarId() {
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
