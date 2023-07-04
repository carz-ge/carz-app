import React from 'react';
import {SafeAreaView} from 'react-native';
import FilterCarWashes from '../../components/date-time-picker/date-time-picker';
import {SearchStackScreenProps} from '../../navigation/types';

export default function PickDateTimeScreen({
  route,
  navigation,
}: SearchStackScreenProps<'pickDateTime'>) {
  function handleSearch(date: string, time: string) {
    const {params} = route;
    console.log(date, time);
    const splittedTime = time.split(' - ')[0];
    navigation.navigate('map', {
      carType: params.carType,
      categoryId: params.categoryId,
      date,
      time: splittedTime,
    });
  }

  return (
    <SafeAreaView>
      <FilterCarWashes onNextHandler={handleSearch} />
    </SafeAreaView>
  );
}
