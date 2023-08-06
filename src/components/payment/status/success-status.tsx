import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/types';
import React from 'react';
import SuccessAnimation from '../../animation-components/success-animation';
import CloseButton from './close-button';
import {View} from 'react-native';

interface SuccessStatusProps {
  onAnimationFinished: () => void;
}

export default function SuccessStatus({
  onAnimationFinished,
}: SuccessStatusProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onCloseClicked = () => {
    navigation.navigate('mainTabs', {
      screen: 'bookings',
    });
  };
  return (
    <View>
      <SuccessAnimation onFinish={onAnimationFinished} />
      <CloseButton onClick={onCloseClicked} />
    </View>
  );
}
