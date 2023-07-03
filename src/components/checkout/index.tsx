import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

interface CheckoutPageProps {
  carNumber: string;
  scheduleTime: string;
  scheduleDate: string;
  providerName: string;
  productName: string;
  packageName: string;
  packagePrice: number;
}

function Checkout({
  carNumber,
  scheduleTime,
  scheduleDate,
  providerName,
  productName,
  packageName,
  packagePrice,
}: CheckoutPageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Car Number: {carNumber}</Text>

      <Text style={styles.label}>Schedule Time: {scheduleTime}</Text>

      <Text style={styles.label}>Schedule Date: {scheduleDate}</Text>

      <Text style={styles.label}>Provider Name: {providerName}</Text>

      <Text style={styles.label}>Product Name: {productName}</Text>

      <Text style={styles.label}>Package Name: {packageName}</Text>

      <Text style={styles.label}>Package Price: {packagePrice}</Text>

      <Button title="Next" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Checkout;
