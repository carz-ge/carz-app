import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../styles/colors';
import {CarType} from '../../graphql/operations';
import {CarTypeToIconMap} from '../car-type/car-types';
import {convertPriceIntoGel} from '../../utils/price';

interface CarTypePickerV2Props {
  carType: CarType | null;
  setCarType: (carType: CarType | null) => void;
  pricesForCarTypes: {
    carType: CarType;
    price: number | null;
  }[];
}

export default function CarTypePickerV2({
  pricesForCarTypes,
  carType,
  setCarType,
}: CarTypePickerV2Props) {
  return (
    <View>
      <Text style={styles.inputHeader}>ავტომობილის ტიპი</Text>
      <FlatList
        data={pricesForCarTypes}
        renderItem={({item, index}) => {
          const CarIconComponent = CarTypeToIconMap[item.carType];

          return (
            <TouchableOpacity
              onPress={() => {
                if (item.carType === carType) {
                  setCarType(null);
                  return;
                }
                setCarType(item.carType);
              }}>
              <View
                style={[
                  styles.carTypeCardContainer,
                  item.carType === carType
                    ? {backgroundColor: colors.secondary}
                    : {},
                ]}>
                <CarIconComponent size={80} />
                <Text style={styles.nameText}>{item.carType}</Text>
                {item.price && (
                  <Text style={styles.nameText}>
                    {convertPriceIntoGel(item.price)} ₾
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.carType}
        horizontal={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendarText: {
    textAlign: 'center',
    fontSize: 20,
  },
  carTypeCardContainer: {
    marginTop: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  carTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 20,
    borderRadius: 4,
  },
  carTypeOptionActive: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  inputHeader: {
    fontSize: 18,
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonSelect: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 4,
  },
  buttonSelectText: {
    textAlign: 'center',
    fontSize: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  icon: {
    marginRight: 10,
    color: '#000',
  },
});
