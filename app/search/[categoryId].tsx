import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {useSearchParams} from 'expo-router';

export default function Search() {
  const params = useSearchParams();
  const categoryId = params.categoryId || '';
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search category {categoryId} </Text>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
