import colors from '../../../styles/colors';
import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CloseButton({onClick}: {onClick: () => void}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.buttonGray,
        borderRadius: 10,
        marginHorizontal: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      }}
      onPress={onClick}>
      <Text>დახურვა</Text>
    </TouchableOpacity>
  );
}
