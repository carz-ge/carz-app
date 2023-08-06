import {RootStackScreenProps} from '../../navigation/types';
import React, {useEffect, useRef, useState} from 'react';
import {createWebsocket} from '../../api/websocket';
import StatusState from '../../components/payment/status/status-state';

enum WsMessageType {
  PAYMENT_RESPONSE = 'PAYMENT_RESPONSE',
  MANAGER_RESPONSE = 'MANAGER_RESPONSE',
}
interface WsMessage {
  messageType: WsMessageType;
  orderId: string;
  success: boolean;
  message?: string;
}

export default function PaymentStatusScreen({
  route,
  navigation,
}: RootStackScreenProps<'paymentStatus'>) {
  console.log('is Success full-> ', route.params.success, route.params.orderId);
  const success = route.params?.success || false;
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnectionClosed, setIsConnectionClosed] = useState(true);

  const navigateToBookings = () => {
    navigation.navigate('mainTabs', {
      screen: 'bookings',
    });
  };

  useEffect(() => {
    // let ws: WebSocket | null = null;
    if (!isConnectionClosed) {
      return;
    }
    createWebsocket(
      'user-order',
      (e: WebSocketMessageEvent) => {
        if (e.data) {
          const parsedMessage = JSON.parse(String(e.data)) as WsMessage;
          if (
            parsedMessage.messageType === WsMessageType.MANAGER_RESPONSE &&
            parsedMessage.success
          ) {
            navigateToBookings();
          }
        }
      },
      () => {
        setIsConnectionClosed(true);
      },
    )
      .then(websocket => {
        setIsConnectionClosed(false);
        // ws = websocket;
        wsRef.current = websocket;
      })
      .catch(e => {
        console.log(e);
        setIsConnectionClosed(true);
      });
    // return () => {
    //   if (ws) {
    //     ws.close();
    //   }
    // };
  }, [isConnectionClosed]);

  return <StatusState successPayment={success} />;
}
