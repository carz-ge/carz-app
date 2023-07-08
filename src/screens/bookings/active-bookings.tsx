import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BookingsTopTabsStackScreenProps} from '../../navigation/bookings-top-tab-navigation';

export default function ActiveBookingsScreen(
  props: BookingsTopTabsStackScreenProps<'activeBookings'>,
) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Bookings</Text>
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
