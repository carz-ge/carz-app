import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import {Car, useListCars} from '../../graphql/operations';
import colors from '../../styles/colors';

interface ChooseCarProps {
  onNextHandler: (car: Car) => void;
}

function ChooseCar({onNextHandler}: ChooseCarProps) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const {data, loading, error} = useListCars();

  const handleCarSelection = (car: Car) => {
    setSelectedCar(car);
  };
  const handleNextPage = () => {
    if (!selectedCar) {
      // show error message
      // toast.show('აირჩიე ან დაამატე მანქანა', {
      //   type: 'danger',
      //   placement: 'center',
      //   duration: 3000,
      // });
      return;
    }
    onNextHandler(selectedCar);
  };

  const renderCar = (car: Car) => {
    return (
      <Pressable
        key={car.id}
        onPress={() => handleCarSelection(car)}
        style={({pressed}) => [
          {
            opacity: pressed ? 0.2 : 1,
            backgroundColor: colors.primary,
          },
          selectedCar && selectedCar.id === car.id
            ? styles.selectedCar
            : styles.car,
        ]}>
        <Ionicons
          name={car.model === 'BMW' ? 'ios-car-sport' : 'ios-car'}
          size={30}
          color="#fff"
        />
        <Text style={styles.plateNumber}>{car.plateNumber}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerCont}>
        <Text style={styles.header}>აირჩიე მანქანა</Text>
      </View>
      {data?.listCars.map(car => renderCar(car))}
      <Pressable style={styles.nextButton} onPress={handleNextPage}>
        <Text style={styles.nextText}>შემდეგი</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'relative',
    height: '100%',
    flex: 1,
  },
  headerCont: {
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  backButton: {
    height: 30,
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -20}],
    left: 0,
    zIndex: 1,
  },
  header: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    lineHeight: 30,
    textAlign: 'center',
  },
  car: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  selectedCar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    marginVertical: 5,
  },
  plateNumber: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 90,
  },
  nextText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ChooseCar;
