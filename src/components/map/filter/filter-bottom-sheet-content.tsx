import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CarType} from '../../../graphql/operations';
import colors from '../../../styles/colors';
import DatePicker from '../../date-time-picker/date-picker';
import TimePicker from '../../date-time-picker/time-picker';
import CarTypePicker from '../../date-time-picker/car-type-picker';

interface FilterBottomSheetProps {
  onFinishButtonPress: (
    date: string | null,
    time: string | null,
    carType: CarType | null,
  ) => void;
}

export default function FilterBottomSheetContent({
  onFinishButtonPress,
}: FilterBottomSheetProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedCarType, setSelectedCarType] = useState<CarType | null>(null);

  function onPress() {
    onFinishButtonPress(selectedDate, selectedTime, selectedCarType);
  }

  return (
    <View style={styles.bodyCont}>
      <DatePicker
        date={selectedDate}
        setDate={date => {
          setSelectedDate(date);
        }}
      />
      <TimePicker
        time={selectedTime}
        setTime={time => {
          setSelectedTime(time);
        }}
      />
      <CarTypePicker
        carType={selectedCarType}
        setCarType={carType => {
          setSelectedCarType(carType);
        }}
      />
      <Pressable style={styles.nextButton} onPress={onPress}>
        <Text style={styles.nextText}>შემდეგი</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyCont: {
    paddingHorizontal: 20,
    gap: 10,
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
    marginHorizontal: 20,
    marginVertical: 90,
  },
  nextText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
