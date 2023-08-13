import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Icon} from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    height: 34,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 18,
    width: 34,
  },
});
interface BaseIconProps {
  containerStyle: ViewStyle;
  icon: {
    name: string;
    type: string;
  };
}

const BaseIcon = ({containerStyle = {}, icon}: BaseIconProps) => (
  <View style={[styles.container, containerStyle]}>
    <Icon size={24} color="white" {...icon} />
  </View>
);

export default BaseIcon;
