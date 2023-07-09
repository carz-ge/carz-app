import {StyleSheet, Text, View} from 'react-native';
import {Order} from '../../graphql/operations';
import colors from '../../styles/colors';
import React from 'react';
interface OrderCardProps {
  order: Order;
}
export default function OrderCard({order}: OrderCardProps) {
  return (
    <View>
      <View style={styles.detailsContainer}>
        <Text>{JSON.stringify(order, null, 2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  detailsContainer: {
    padding: 20,
    gap: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.grayLight,
    justifyContent: 'center',
    marginVertical: 10,
  },
});
