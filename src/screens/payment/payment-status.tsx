import {RootStackScreenProps} from '../../navigation/types';
import React from 'react';
import {Text} from 'react-native';
import SuccessAnimation from '../../components/animation-components/success-animation';
import FailAnimation from '../../components/animation-components/fail-animation';
export default function PaymentStatusScreen({
  route,
  navigation,
}: RootStackScreenProps<'paymentStatus'>) {
  console.log('is Success full-> ', route.params.success, route.params.orderId);
  const success = route.params?.success || false;
  return (
    <>
      <Text>{success}</Text>;
      {success ? <SuccessAnimation /> : <FailAnimation />}
    </>
  );
}
