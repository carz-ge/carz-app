import React, {useCallback, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Ionicons} from '@expo/vector-icons';
import CustomBackdrop from '../bottom-sheet/customBackdrop';
import colors from '../../styles/colors';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop';

interface DatePickerProps {
  time: string | null;
  setTime: (date: string | null) => void;
}

export default function TimePicker({time, setTime}: DatePickerProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  function openTimePicker() {
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
        index={0}
        snapPoints={['100%']}
        backdropComponent={renderBackdrop}>
        <View style={styles.timePopup}>
          <View style={styles.calendarTextTimeCont}>
            <Text style={styles.calendarTextTime}>აირჩიე დრო</Text>
          </View>
          <BottomSheetScrollView>
            <View style={styles.timeOptionsCont}>
              {Array.from(Array(10).keys()).map((timeStamp, index) => {
                return Array.from(Array(4).keys()).map((minute, index) => {
                  const initialTime = timeStamp + 9;
                  const item = `${initialTime}:${
                    minute === 0 ? '00' : minute * 15
                  }`;
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        if (time === item) {
                          setTime(null);
                          return;
                        }
                        setTime(item);
                        handleOnClose();
                      }}
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
          </BottomSheetScrollView>
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
