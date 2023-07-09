import React from 'react';
import {WebView} from 'react-native-webview';
import {RootStackScreenProps} from '../../navigation/types';

export default function PaymentScreen({
  route,
  navigation,
}: RootStackScreenProps<'payment'>) {
  console.log('redirect url-> ', route.params.redirectUrl);
  return (
    <WebView
      source={{uri: route.params.redirectUrl}}
      onNavigationStateChange={navState => {
        console.log('nav State-> ', navState);
        const success = navState.url.includes('success');
        navigation.navigate('paymentInfo', {
          success: success,
          orderId: route.params.orderId,
        });
      }}
    />
  );
}
