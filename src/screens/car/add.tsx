import React from 'react';
import {StyleSheet} from 'react-native';
import AddCar from '../../components/car/add-car';
import {CarStackScreenProps} from '../../navigation/types';

export default function AddCarScreen(props: CarStackScreenProps<'addCar'>) {
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
