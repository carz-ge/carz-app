import React, {useCallback, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Ionicons} from '@expo/vector-icons';
import {Calendar} from 'react-native-calendars';
import CustomBackdrop from '../bottom-sheet/customBackdrop';
import colors from '../../styles/colors';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop';

interface DatePickerProps {
  date: string | null;
  setDate: (date: string | null) => void;
}

export default function DatePicker({date, setDate}: DatePickerProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  function openDatePicker() {
    bottomSheetModalRef.current?.present();
  }
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
        backdropComponent={renderBackdrop}>
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
              handleOnClose();
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
    borderWidth: 1,
    borderColor: colors.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputIcon: {},
  inputHeader: {
    fontSize: 18,
    fontWeight: '500',
  },
});
