import React, {useRef} from 'react';
import {AutoStation, useListAutoStations} from '../../graphql/operations';
import {RootStackScreenProps} from '../../navigation/types';
import {StyleSheet, View, Text} from 'react-native';
import {Image} from 'expo-image';
import MapView from 'react-native-map-clustering';
import {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import colors from '../../styles/colors';
import GoBack from '../../components/go-back';

const INITIAL_REGION = {
  latitude: 41.8,
  longitude: 44.8,
  latitudeDelta: 0.3,
  longitudeDelta: 0.3,
};

export default function AutoStationsMapScreen({
  route,
}: RootStackScreenProps<'stationsMap'>) {
  const {data, loading, error} = useListAutoStations({
    fetchPolicy: 'network-only',
  });

  const autoStations: AutoStation[] = data?.listAutoStations ?? [];
  console.log('search data: ', autoStations?.length, loading, error);

  const mapRef = useRef<MapView | null>(null);

  return (
    <View style={styles.container}>
      <GoBack />
      <MapView
        ref={mapRef}
        style={styles.mapView}
        provider={PROVIDER_GOOGLE}
        // cacheEnabled={true}
        // showsTraffic
        showsUserLocation
        // followsUserLocation
        showsMyLocationButton={false}
        // showsIndoors
        showsBuildings
        showsScale
        showsCompass
        initialRegion={INITIAL_REGION}>
        {autoStations.map((station, i) => {
          return (
            <Marker
              key={station.id}
              coordinate={{
                latitude: station.location?.coordinates.lat ?? 41.690985,
                longitude: station.location?.coordinates.lng ?? 44.812271,
              }}
              onPress={() => {
                console.log(station);
              }}>
              <Callout style={{zIndex: 9999}}>
                <View>
                  <Text>{station.name.ka}</Text>
                  <Text>{station.providerCode}</Text>
                  {/*<Text>*/}
                  {/*  "მარშალ გელოვანის გამზ. (პოლიციის სამმ. მიმდებარედ)"*/}
                  {/*</Text>*/}
                  {/*{station.description && (*/}
                  {/*  <Text>*/}
                  {/*    {station.description.ka*/}
                  {/*      .replaceAll('.', ' ')*/}
                  {/*      .replaceAll(',', ' ')*/}
                  {/*      .replaceAll('-', ' ')*/}
                  {/*      .replaceAll('\n', ' ')}*/}
                  {/*  </Text>*/}
                  {/*)}*/}
                  {station.image && (
                    <Image
                      source={{uri: station.image}}
                      style={{width: 200, height: 200}}
                    />
                  )}
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {width: '100%', height: '100%'},
  mapView: {width: '100%', height: '100%'},
  carouselListContainer: {position: 'absolute', bottom: 10},
  myLocationIcon: {width: '100%', height: '100%'},
  currentLocBtn: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 20,
    position: 'absolute',
    bottom: 155,
    right: 10,
  },
});
