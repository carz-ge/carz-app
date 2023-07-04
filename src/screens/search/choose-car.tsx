import React from 'react';
import {StyleSheet, View} from 'react-native';
import ChooseCar from '../../components/car/choose-car';
import AddCarButton from '../../components/car/add-car-button';
import {SearchStackScreenProps} from '../../navigation/types';
import {CarType} from '../../graphql/operations';

export default function ChooseCarScreen({
  route,
  navigation,
}: SearchStackScreenProps<'chooseCar'>) {
  const categoryId = route.params.categoryId || '';
  return (
    <View style={styles.container}>
      <ChooseCar
        onNextHandler={car => {
          navigation.navigate('pickDateTime', {
            carId: car.id,
            carType: car.carType || CarType.All,
            categoryId,
          });
        }}
      />
      <AddCarButton />
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
