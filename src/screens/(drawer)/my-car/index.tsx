import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Car, useListCars} from '../../../graphql/operations';
import {PressableCarItem} from '../../../components/car/car-item';
import AddCarButton from '../../../components/car/add-car-button';
import {AppDrawerScreenProps} from '../../../navigation/types';

export default function MyCars({navigation}: AppDrawerScreenProps<'myCar'>) {
  const {data, loading, error} = useListCars({
    fetchPolicy: 'cache-and-network',
  });

  const onPress = (car: Car) => {
    navigation.navigate('carStack', {
      screen: 'car',
      params: {
        carId: car.id,
      },
    });
  };
  if (loading) {
    // TODO
    return <Text>Loading</Text>;
  }

  const noData = loading || !data;
  return (
    <View style={styles.container}>
      {!noData && (
        <FlatList
          data={data.listCars}
          renderItem={({item}) => (
            <PressableCarItem car={item} onPress={onPress} />
          )}
          keyExtractor={item => item.id}
          horizontal={false}
        />
      )}
      {noData && <Text>დააამატე მანქანა</Text>}
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
});
