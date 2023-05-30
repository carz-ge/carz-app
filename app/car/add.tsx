import React from 'react';
import {StyleSheet} from 'react-native';
import AddCar from '../../components/car/add-car';

export default function Add() {
  return <AddCar />;
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
