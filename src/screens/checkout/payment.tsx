import {RootStackScreenProps} from '../../navigation/types';
import React from 'react';
import {WebView} from 'react-native-webview';

export default function PaymentScreen({
  route,
  navigation,
}: RootStackScreenProps<'payment'>) {
  return <WebView source={{uri: route.params.redirectUrl}} />;
}
