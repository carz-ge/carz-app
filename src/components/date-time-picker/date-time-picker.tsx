import React, {useRef, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Ionicons} from '@expo/vector-icons';
import {Calendar} from 'react-native-calendars';
import CustomBackdrop from '../bottom-sheet/customBackdrop';
import colors from '../../styles/colors';

interface DateTimePickerProps {
  onNextHandler: (date: string, time: string) => void;
}

export default function DateTimePicker({onNextHandler}: DateTimePickerProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRefTime = useRef<BottomSheetModal>(null);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  function openDatePicker() {
    bottomSheetModalRef.current?.present();
  }

  function openTimeSelector() {
    bottomSheetModalRefTime.current?.present();
  }

  function onPress() {
    if (!selectedDate || !selectedTime) {
      return;
    }
    onNextHandler(selectedDate, selectedTime);
  }

  return (
    <>
      <View style={styles.bodyCont}>
        <View>
          <Text style={styles.inputHeader}>ჯავშნის თარიღი</Text>
          <TouchableOpacity onPress={openDatePicker}>
            <View style={styles.input}>
              <Text style={styles.inputText}>
                {selectedDate || 'აირჩიე თარიღი'}
              </Text>
              <View style={styles.inputIcon}>
                <Ionicons name="calendar" size={20} color="#000" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.reservationTime}>
          <Text style={styles.inputHeader}>ჯავშნის დრო</Text>
          <TouchableOpacity onPress={openTimeSelector}>
            <View style={styles.input}>
              <Text style={styles.inputText}>
                {selectedTime || 'აირჩიე დრო'}
              </Text>
              <View style={styles.inputIcon}>
                <Ionicons name="time" size={20} color="#000" />
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
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: 'orange',
                },
              }}
              onDayPress={day => {
                setSelectedDate(day.dateString);
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
        <BottomSheetModal
          ref={bottomSheetModalRefTime}
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
                    const time = timeStamp + 9;
                    const item = `${time}:${
                      minute === 0 ? '00' : minute * 15
                    } - ${minute === 3 ? time + 1 : time}:${
                      minute === 3 ? '00' : (minute + 1) * 15
                    }`;
                    return (
                      <TouchableOpacity
                        onPress={() => setSelectedTime(item)}
                        key={index}
                        style={[
                          styles.timeOption,
                          item === selectedTime && styles.timeOptionActive,
                        ]}>
                        <Text
                          style={[
                            styles.timeOptionText,
                            item === selectedTime &&
                              styles.timeOptionTextActive,
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
                  onPress={() => bottomSheetModalRefTime.current?.close()}>
                  არჩევა ({selectedTime})
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetModal>
      </View>
      <Pressable style={styles.nextButton} onPress={onPress}>
        <Text style={styles.nextText}>შემდეგი</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerCont: {
    display: 'flex',
    // AlignItems: 'center',
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
  inputHeader: {
    fontSize: 18,
    fontWeight: '500',
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
