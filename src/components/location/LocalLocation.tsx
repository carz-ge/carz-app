import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import Device from 'expo-device';
import * as Location from 'expo-location';

export async function requestLocationPermission() {
  if (Platform.OS === 'android' && !Device.isDevice) {
    return false;
  }
  let {status} = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

export default function useRequestLocationPermission() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      await requestLocationPermission();
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    return [false, null];
  } else if (location) {
    return [true, location];
  }
}
