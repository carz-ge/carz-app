import React from 'react';
import {Text, StyleSheet, View, ScrollView, FlatList} from 'react-native';
import {useListCars} from '../../../graphql/operations';
import {PressableCarItem} from '../../../components/castomer-car/car-item';
import {useRouter} from 'expo-router';

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
