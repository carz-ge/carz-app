import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Marker} from 'react-native-maps';

interface CustomMarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  price: number;
  onPress: () => void;
  isSelected: boolean;
}

export default function CustomMarker({
  coordinate,
  price,
  onPress,
  isSelected,
}: CustomMarkerProps) {
  console.log('CustomMarker', coordinate, isSelected);
  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      <View style={isSelected ? styles.view_black : styles.view_white}>
        <Text style={isSelected ? styles.text_white : styles.text_black}>
          {price} GEL
        </Text>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  view_white: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 1,
  },
  view_black: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 1,
  },
  text_white: {
    color: 'white',
    fontWeight: 'bold',
  },
  text_black: {
    color: 'black',
    fontWeight: 'bold',
  },
});
