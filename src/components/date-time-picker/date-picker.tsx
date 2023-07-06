import React, {useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Ionicons} from '@expo/vector-icons';
import {Calendar} from 'react-native-calendars';
import CustomBackdrop from '../cutomBackdrop/customBackdrop';
import colors from '../../styles/colors';

interface DatePickerProps {
  date: string | null;
  setDate: (date: string | null) => void;
}

export default function DatePicker({date, setDate}: DatePickerProps) {
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
            <Text style={styles.inputText}>{date || 'აირჩიე თარიღი'}</Text>
            <View style={styles.inputIcon}>
              <Ionicons name="calendar" size={20} color="#000" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={['70%', '65%']}
        backdropComponent={CustomBackdrop}>
        <View>
          <Text style={styles.calendarText}>აირჩიე თარიღი</Text>
          <Calendar
            firstDay={1}
            minDate={Date().toString()}
            markedDates={
              date
                ? {
                    [date]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedColor: colors.primary,
                    },
                  }
                : undefined
            }
            onDayPress={day => {
              setDate(day.dateString);
            }}
          />
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
  input: {
    marginTop: 10,
    backgroundColor: colors.white,
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
  inputHeader: {
    fontSize: 18,
    fontWeight: '500',
  },
});
