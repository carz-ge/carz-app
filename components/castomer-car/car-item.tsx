import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Car} from '../../graphql/operations';
import colors from '../../lib/styles/colors';
import {useRouter} from 'expo-router';

const CarItem = ({item}: {item: Car}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Plate Number:</Text>
      <Text style={styles.text}>{item.plateNumber}</Text>

      <Text style={styles.label}>Car Type:</Text>
      <Text style={styles.text}>{item.carType || 'Unknown'}</Text>

      <Text style={styles.label}>Tech Passport Number:</Text>
      <Text style={styles.text}>{item.techPassportNumber || 'N/A'}</Text>

      <Text style={styles.label}>VIN:</Text>
      <Text style={styles.text}>{item.vin || 'N/A'}</Text>

      <Text style={styles.label}>Make:</Text>
      <Text style={styles.text}>{item.make || 'Unknown'}</Text>

      <Text style={styles.label}>Model:</Text>
      <Text style={styles.text}>{item.model || 'Unknown'}</Text>

      <Text style={styles.label}>გამოშვების წელი:</Text>
      <Text style={styles.text}>{item.year || 'Unknown'}</Text>
    </View>
  );
};

export function PressableCarItem({item, router}: {item: Car, router: any}) {
  return (
    <Pressable
      onPress={() => {
        router.push(`/car/${item.id}`);
      }}>
      <CarItem item={item} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    color: colors.white,
    marginBottom: 10,
  },
});

export default CarItem;
