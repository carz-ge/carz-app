import React from 'react';
import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {CarInput, CarType, useAddCar} from '../../graphql/operations';
import {Ionicons} from '@expo/vector-icons';
import colors from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core/src/types';
import {RootStackParamList} from '../../navigation/types';

interface ICarForm extends CarInput {
  plateNumber: string;
  name: string;
  vin: string;
  techPassportNumber: string;
  mark: string;
  make: string;
  model: string;
  year: number;
  carType: CarType;
}

const defaultValues: ICarForm = {
  plateNumber: '',
  name: '',
  vin: '',
  techPassportNumber: '',
  mark: '',
  make: '',
  model: '',
  year: 0,
  carType: CarType.Sedan,
};

export default function AddCar() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {control, handleSubmit} = useForm<ICarForm>({
    defaultValues: defaultValues,
  });

  const [addCar] = useAddCar({
    fetchPolicy: 'network-only',
  });
  const onSubmit = async (data: ICarForm) => {
    console.log(data);
    await addCar({
      variables: {
        carInput: data,
      },
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Plate Number"
            />
          )}
          name="plateNumber"
          rules={{required: true}}
          defaultValue=""
        />

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="VIN Code"
            />
          )}
          name="vin"
          rules={{required: true}}
          defaultValue=""
        />

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Tech Inspection Car Number"
            />
          )}
          name="techPassportNumber"
          rules={{required: true}}
          defaultValue=""
        />

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Mark"
            />
          )}
          name="mark"
          rules={{required: true}}
          defaultValue=""
        />

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Model"
            />
          )}
          name="model"
          rules={{required: true}}
          defaultValue=""
        />

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={String(value)}
              placeholder="Year"
            />
          )}
          name="year"
          rules={{required: true}}
        />

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>დაამატე მანქანა</Text>
        </Pressable>

        <Text style={styles.orText}>ან</Text>

        <Pressable
          style={styles.qrButton}
          onPress={() =>
            navigation.navigate('carStack', {
              screen: 'techCardQrScan',
            })
          }>
          <Ionicons name={'qr-code-outline'} size={30} color={'#fff'} />
          <Text style={styles.qrButtonText}>დაასკანერე ტექ. პასპორტი</Text>
        </Pressable>
      </View>
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
  header: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formContainer: {
    width: '80%',
    marginTop: 50,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  qrButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 20,
  },
  qrButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {marginTop: 20},
});
