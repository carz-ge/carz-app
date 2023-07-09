import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {BookingsTopTabsStackScreenProps} from '../../navigation/bookings-top-tab-navigation';
import {useListOrders} from '../../graphql/operations';
import OrderCard from '../../components/bookings/order-card';

export default function ActiveBookingsScreen(
  props: BookingsTopTabsStackScreenProps<'activeBookings'>,
) {
  const {data, loading, error} = useListOrders({
    fetchPolicy: 'network-only',
  });

  console.log('useListOrders->', data, loading, error);
  if (loading || error) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      {!loading && (
        <FlatList
          data={data?.listOrders}
          renderItem={({item, index}) => <OrderCard order={item} />}
          keyExtractor={item => item.id}
          horizontal={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});
