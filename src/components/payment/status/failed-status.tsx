import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/types';
import {View} from 'react-native';
import FailAnimation from '../../animation-components/fail-animation';
import React from 'react';
import CloseButton from './close-button';

export default function FailedStatus() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onCloseClicked = () => {
    navigation.navigate('mainTabs');
  };
  return (
    <View>
      <FailAnimation />
      <CloseButton onClick={onCloseClicked} />
    </View>
  );
}
