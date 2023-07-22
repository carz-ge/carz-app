import React, {FunctionComponent, memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Marker} from 'react-native-maps';
import colors from '../../styles/colors';

interface CustomMarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  price: string;
  onPress: () => void;
  isSelected: boolean;
}

const CustomMarker: FunctionComponent<CustomMarkerProps> = memo(
  ({coordinate, price, onPress, isSelected}: CustomMarkerProps) => {
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
  },
  (prevProps, nextProps) =>
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.onPress === nextProps.onPress &&
    prevProps.price === nextProps.price &&
    prevProps.coordinate === nextProps.coordinate,
);

export default CustomMarker;

const styles = StyleSheet.create({
  view_white: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 1,
  },
  view_black: {
    backgroundColor: colors.primary,
    padding: 15,
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
