import React, {useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Ionicons} from '@expo/vector-icons';
import CustomBackdrop from '../cutomBackdrop/customBackdrop';
import colors from '../../styles/colors';
import {CarType} from '../../graphql/operations';
import {carTypes, IconName} from '../car/add-car';

interface DatePickerProps {
  carType: CarType | null;
  setCarType: (carType: CarType | null) => void;
}

export default function CarTypePicker({carType, setCarType}: DatePickerProps) {
  const [iconName, setIconName] = React.useState<IconName>('car');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  function openDatePicker() {
    bottomSheetModalRef.current?.present();
  }
  return (
    <>
      <View>
        <Text style={styles.inputHeader}>ჯავშნის თარიღი</Text>
        <TouchableOpacity onPress={openDatePicker}>
          <View style={styles.input}>
            <Text style={styles.inputText}>
              {carType || 'აირჩიე მანქანის ტიპი'}
            </Text>
            <View style={styles.inputIcon}>
              <Ionicons name={iconName} size={20} color="#000" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['90%']}
        backdropComponent={CustomBackdrop}>
        <View>
          <Text style={styles.calendarText}>აირჩიე მანქანის ტიპი</Text>
          <ScrollView style={{margin: 20, padding: 20}}>
            {carTypes.map((car, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setCarType(car.type);
                  setIconName(car.icon);
                }}
                style={[
                  styles.carTypeOption,
                  carType === car.type && styles.carTypeOptionActive,
                ]}>
                <Ionicons name={car.icon} size={30} style={styles.icon} />
                <Text style={styles.buttonText}>{car.type}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonSelect}>
              <Text
                style={styles.buttonSelectText}
                onPress={() => bottomSheetModalRef.current?.close()}>
                არჩევა
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  calendarText: {
    textAlign: 'center',
    fontSize: 20,
  },
  input: {
    marginTop: 10,
    backgroundColor: '#f3f5fa',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    position: 'relative',
  },
  inputText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
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
