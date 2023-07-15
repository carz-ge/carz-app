import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {BookingsTopTabsStackScreenProps} from '../../navigation/bookings-top-tab-navigation';
import {useListOrders} from '../../graphql/operations';
import OrderCard from '../../components/bookings/order-card';
import CustomActivityIndicator from '../../components/activity-indicator/custom-activity-indicator';

export default function ActiveBookingsScreen(
  props: BookingsTopTabsStackScreenProps<'activeBookings'>,
) {
  const {data, loading, error} = useListOrders({
    fetchPolicy: 'network-only',
  });

  console.log('List Orders', data, loading, error);
  if (loading || error) {
    return <CustomActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {!loading && (
        <FlatList
          data={data?.listOrders}
          renderItem={({item, index}) => <OrderCard order={item} />}
          keyExtractor={item => item.id}
          horizontal={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});
