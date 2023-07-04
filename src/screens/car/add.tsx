import React from 'react';
import AddCar from '../../components/car/add-car';
import {CarStackScreenProps} from '../../navigation/types';

export default function AddCarScreen(props: CarStackScreenProps<'addCar'>) {
  return <AddCar />;
}
