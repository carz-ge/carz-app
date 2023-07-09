import {RootStackScreenProps} from '../../navigation/types';
import React from 'react';
import {Text} from 'react-native';
export default function PaymentStatusScreen({
  route,
  navigation,
}: RootStackScreenProps<'paymentStatus'>) {
  console.log('is Success full-> ', route.params.success, route.params.orderId);
  return <Text>route.params?.success</Text>;
}
