import React, {ComponentProps, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core/src/types';
import {CarType, useAddCar} from '../../graphql/operations';
import {RootStackParamList} from '../../navigation/types';

type Props = ComponentProps<typeof Ionicons>;
export type IconName = Props['name'];

const carTypes: {type: CarType; icon: IconName}[] = [
  {type: CarType.Hatchback, icon: 'ios-car-sport'},
  {type: CarType.Motorcycle, icon: 'ios-bicycle'},
  {type: CarType.Sedan, icon: 'ios-car'},
  {type: CarType.Suv, icon: 'ios-car-sport'},
  {type: CarType.Truck, icon: 'ios-car'},
  {type: CarType.Van, icon: 'ios-bus-outline'},
];

function CarSelection() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedCarType, setSelectedCarType] = useState<CarType | null>(null);
  const [addCar] = useAddCar({
    fetchPolicy: 'network-only',
  });

  const [plateNumber, setPlateNumber] = useState('');

  const handleSubmit = async () => {
    // Add your logic here to handle the submitted data
    console.log(selectedCarType, plateNumber);
    if (!selectedCarType || !plateNumber) {
      // TODO show error
      return;
    }

    await addCar({
      variables: {
        carInput: {
          plateNumber,
          carType: selectedCarType,
          vin: null,
          techPassportNumber: null,
          make: null,
          model: null,
          year: null,
        },
      },
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Plate Number"
          value={plateNumber}
          onChangeText={text => setPlateNumber(text)}
        />
      </View>
      <View>
        {carTypes.map((car, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedCarType(car.type)}
            style={
              selectedCarType === car.type
                ? styles.selectedButton
                : styles.button
            }>
            <Ionicons name={car.icon} size={30} style={styles.icon} />
            <Text style={styles.buttonText}>{car.type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedCarType && (
        <Text style={styles.selectedCarTypeText}>
          Selected car type: {selectedCarType}
        </Text>
      )}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 5,
  },
  selectedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007aff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 5,
  },
  icon: {
    marginRight: 10,
    color: '#000',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#007aff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  selectedCarTypeText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CarSelection;
