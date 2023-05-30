import React from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import {useRouter} from 'expo-router';
import {useListCars} from '../../../graphql/operations';
import {PressableCarItem} from '../../../components/customer-car/car-item';
import AddCarButton from '../../../components/customer-car/add-car-button';

export default function Cars() {
  const router = useRouter();

  const {data, loading, error} = useListCars({
    fetchPolicy: 'cache-and-network',
  });

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
            <PressableCarItem item={item} router={router} />
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
