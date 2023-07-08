import React, {useCallback, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CustomBackdrop from '../bottom-sheet/customBackdrop';
import colors from '../../styles/colors';
import {CarType} from '../../graphql/operations';
import {carTypes} from '../car/add-car';
import {CarTypeToIconMap} from '../car-type/car-types';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop';

interface DatePickerProps {
  carType: CarType | null;
  setCarType: (carType: CarType | null) => void;
}

export default function CarTypePicker({carType, setCarType}: DatePickerProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  function openDatePicker() {
    bottomSheetModalRef.current?.present();
  }
  const CarIconComponent = CarTypeToIconMap[carType || CarType.Sedan];
  const handleOnClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <CustomBackdrop onPress={handleOnClose} {...props} />
    ),
    [handleOnClose],
  );
  return (
    <>
      <View>
        <Text style={styles.inputHeader}>ავტომობილის ტიპი</Text>
        <TouchableOpacity onPress={openDatePicker}>
          <View style={styles.input}>
            <Text style={styles.inputText}>
              {carType || 'აირჩიე მანქანის ტიპი'}
            </Text>
            <View style={styles.inputIcon}>
              <CarIconComponent size={40} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['90%']}
        backdropComponent={renderBackdrop}>
        <View>
          <Text style={styles.calendarText}>აირჩიე მანქანის ტიპი</Text>
          <ScrollView
            style={{
              margin: 20,
              padding: 20,
              marginTop: 10,
            }}>
            {carTypes.map((car, index) => {
              const CarIconComponent = CarTypeToIconMap[car.type];

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    if (carType === car.type) {
                      setCarType(null);
                      return;
                    }
                    setCarType(car.type);
                  }}
                  style={[
                    styles.carTypeOption,
                    carType === car.type && styles.carTypeOptionActive,
                  ]}>
                  <CarIconComponent size={40} />
                  <Text style={styles.buttonText}>{car.type}</Text>
                </TouchableOpacity>
              );
            })}
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
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray,
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
    gap: 10,
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
