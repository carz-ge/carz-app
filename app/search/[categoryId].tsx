import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useRouter, useSearchParams} from 'expo-router';
import ChooseCar from '../../components/castomer-car/choose-car';
import AddCarButton from '../../components/castomer-car/add-car-button';

export default function Search() {
  const router = useRouter();
  const params = useSearchParams();
  const categoryId = params.categoryId || '';
  return (
    <View style={styles.container}>
      <ChooseCar
        onNextHandler={car => {
          router.push({
            pathname: '/search/pick-date-time',
            params: {
              carId: car.id,
              carType: car.carType,
              categoryId,
            },
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
