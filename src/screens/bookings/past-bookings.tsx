import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {BookingsTopTabsStackScreenProps} from '../../navigation/bookings-top-tab-navigation';

export default function PastBookingsScreen(
  props: BookingsTopTabsStackScreenProps<'pastBookings'>,
) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Past Bookings</Text>
    </SafeAreaView>
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
