import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import FilterCarWashes from '../../components/date-time-picker/date-time-picker';
import {useRouter, useSearchParams} from 'expo-router';

export default function PickDateTime() {
  const router = useRouter();
  const params = useSearchParams();

  function handleSearch(date: string, time: string) {
    console.log(date, time);
    if (typeof params.categoryId !== 'string') {
      return;
    }
    if (typeof params.carType !== 'string') {
      return;
    }
    const splittedTime = time.split(' - ')[0];
    router.push({
      pathname: '/map/result',
      params: {
        carType: params.carType,
        categoryId: params.categoryId,
        date,
        time: splittedTime,
      },
    });
  }

  return (
    <SafeAreaView>
      <FilterCarWashes onNextHandler={handleSearch} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
