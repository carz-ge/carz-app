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

interface DatePickerProps {
  time: string | null;
  setTime: (date: string | null) => void;
}

export default function TimePicker({time, setTime}: DatePickerProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  function openTimePicker() {
    bottomSheetModalRef.current?.present();
  }

  return (
    <>
      <View style={styles.reservationTime}>
        <Text style={styles.inputHeader}>ჯავშნის დრო</Text>
        <TouchableOpacity onPress={openTimePicker}>
          <View style={styles.input}>
            <Text style={styles.inputText}>{time || 'აირჩიე დრო'}</Text>
            <View style={styles.inputIcon}>
              <Ionicons name="time" size={20} color="#000" />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={['100%', '100%']}
        backdropComponent={CustomBackdrop}>
        <View style={styles.timePopup}>
          <View style={styles.calendarTextTimeCont}>
            <Text style={styles.calendarTextTime}>აირჩიე დრო</Text>
          </View>
          <ScrollView>
            <View style={styles.timeOptionsCont}>
              {Array.from(Array(10).keys()).map((timeStamp, index) => {
                return Array.from(Array(4).keys()).map((minute, index) => {
                  const initialTime = timeStamp + 9;
                  const item = `${initialTime}:${
                    minute === 0 ? '00' : minute * 15
                  } - ${minute === 3 ? initialTime + 1 : initialTime}:${
                    minute === 3 ? '00' : (minute + 1) * 15
                  }`;
                  return (
                    <TouchableOpacity
                      onPress={() => setTime(item)}
                      key={index}
                      style={[
                        styles.timeOption,
                        item === time && styles.timeOptionActive,
                      ]}>
                      <Text
                        style={[
                          styles.timeOptionText,
                          item === time && styles.timeOptionTextActive,
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                });
              })}
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonSelect}>
              <Text
                style={styles.buttonSelectText}
                onPress={() => bottomSheetModalRef.current?.close()}>
                {time ? `არჩევა (${time})` : 'დახურვა'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
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
  bodyCont: {
    paddingHorizontal: 20,
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
  reservationTime: {
    marginTop: 40,
  },
  timeOptionsCont: {
    marginTop: 10,
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'column',
    gap: 10,
  },
  timeOption: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 20,
    borderRadius: 4,
  },
  timeOptionText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  timePopup: {
    flex: 1,
    paddingVertical: 20,
    height: '100%',
  },
  calendarTextTime: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  calendarTextTimeCont: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  timeOptionActive: {
    borderColor: '#000',
    borderWidth: 2,
  },
  timeOptionTextActive: {
    color: colors.primary,
  },
  inputHeader: {
    fontSize: 18,
    fontWeight: '500',
  },
});
