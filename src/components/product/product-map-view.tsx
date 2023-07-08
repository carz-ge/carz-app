import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import React from 'react';

interface ProductMapViewProps {
  name: string;
  lat: number;
  lng: number;
}

export default function ProductMapView({name, lat, lng}: ProductMapViewProps) {
  return (
    <View style={{marginHorizontal: 20}}>
      <MapView
        scrollEnabled={false}
        style={{
          flex: 1,
          height: 250,
        }}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}>
        <Marker
          coordinate={{
            latitude: lat,
            longitude: lng,
          }}
          title={name}
        />
      </MapView>
    </View>
  );
}
