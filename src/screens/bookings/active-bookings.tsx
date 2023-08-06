import React, {useEffect} from 'react';
import {FlatList, RefreshControl, SafeAreaView, StyleSheet} from 'react-native';
import {BookingsTopTabsStackScreenProps} from '../../navigation/bookings-top-tab-navigation';
import {useListOrders} from '../../graphql/operations';
import OrderCard from '../../components/bookings/order-card';
import CustomActivityIndicator from '../../components/activity-indicator/custom-activity-indicator';
import {useIsFocused} from '@react-navigation/core';

export default function ActiveBookingsScreen(
  props: BookingsTopTabsStackScreenProps<'activeBookings'>,
) {
  const {data, loading, error, refetch} = useListOrders({
    fetchPolicy: 'network-only',
  });
  const isFocused = useIsFocused();
  console.log('List Orders', data, loading, error);
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  if (loading || error) {
    return <CustomActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data?.listOrders || []}
        renderItem={({item, index}) => <OrderCard order={item} />}
        keyExtractor={item => item.id}
        horizontal={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});
