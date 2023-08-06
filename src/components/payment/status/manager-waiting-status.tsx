import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/types';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CarLoadingAnimation from '../../animation-components/car-loading-animation';
import CloseButton from './close-button';

export default function ManagerWaitingStatus() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onCloseClicked = () => {
    navigation.navigate('mainTabs', {
      screen: 'bookings',
    });
  };
  return (
    <View>
      <Text style={styles.modalText}>ველოდებით მენეჯერს</Text>
      <CarLoadingAnimation />
      <CloseButton onClick={onCloseClicked} />
    </View>
  );
}

const styles = StyleSheet.create({
  modalText: {
    marginVertical: 15,
    textAlign: 'center',
  },
});
