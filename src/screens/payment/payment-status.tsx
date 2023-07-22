import {RootStackScreenProps} from '../../navigation/types';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import SuccessAnimation from '../../components/animation-components/success-animation';
import FailAnimation from '../../components/animation-components/fail-animation';
import {createWebsocket} from '../../api/websocket';
import CarLoadingAnimation from '../../components/animation-components/car-loading-animation';
import GoBack from '../../components/go-back';

export default function PaymentStatusScreen({
  route,
}: RootStackScreenProps<'paymentStatus'>) {
  console.log('is Success full-> ', route.params.success, route.params.orderId);
  const success = route.params?.success || false;
  const [text, setText] = useState<string>('');
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnectionClosed, setIsConnectionClosed] = useState(true);
  const [showModal, setShowModal] = useState(false);

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

  function onAnimationFinish() {
    setShowModal(true);
  }

  return (
    <SafeAreaView>
      <GoBack />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>{success}</Text>
        {success ? (
          <SuccessAnimation onFinish={onAnimationFinish} />
        ) : (
          <FailAnimation onFinish={onAnimationFinish} />
        )}
        <Text>{text}</Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setShowModal(!showModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>ველოდებით მენეჯერს</Text>
              <Text style={styles.modalText}>{text}</Text>
              <CarLoadingAnimation />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
