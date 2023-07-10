import {RootStackScreenProps} from '../../navigation/types';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import SuccessAnimation from '../../components/animation-components/success-animation';
import FailAnimation from '../../components/animation-components/fail-animation';
import {createWebsocket} from '../../api/websocket';
export default function PaymentStatusScreen({
  route,
  navigation,
}: RootStackScreenProps<'paymentStatus'>) {
  console.log('is Success full-> ', route.params.success, route.params.orderId);
  const success = route.params?.success || false;
  const [text, setText] = useState<string>('');
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnectionClosed, setIsConnectionClosed] = useState(true);

  useEffect(() => {
    let ws: WebSocket | null = null;
    if (!isConnectionClosed) {
      return;
    }
    createWebsocket(
      'user-order',
      (e: WebSocketMessageEvent) => {
        setText(String(e?.data) || '');
      },
      () => {
        setIsConnectionClosed(true);
      },
    )
      .then(websocket => {
        setIsConnectionClosed(false);
        ws = websocket;
        wsRef.current = websocket;
      })
      .catch(e => {
        console.log(e);
        setIsConnectionClosed(true);
      });
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [isConnectionClosed]);
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>{success}</Text>
        {success ? <SuccessAnimation /> : <FailAnimation />}
        <Text>{text}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
