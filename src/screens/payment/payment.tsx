import React from 'react';
import {WebView} from 'react-native-webview';
import {RootStackScreenProps} from '../../navigation/types';

export default function PaymentScreen({
  route,
  navigation,
}: RootStackScreenProps<'payment'>) {
  console.log('redirect url-> ', route.params.redirectUrl);
  const successUrl = `payment/redirect/${route.params.orderId}/success`;
  const rejectUrl = `payment/redirect/${route.params.orderId}/reject`;

  return (
    <WebView
      source={{uri: route.params.redirectUrl}}
      onNavigationStateChange={navState => {
        console.log('nav State-> ', navState);
        if (navState.url.includes(successUrl)) {
          navigation.navigate('paymentStatus', {
            success: true,
            orderId: route.params.orderId,
          });
          return;
        }
        if (navState.url.includes(rejectUrl)) {
          navigation.navigate('paymentStatus', {
            success: false,
            orderId: route.params.orderId,
          });
        }
      }}
    />
  );
}
