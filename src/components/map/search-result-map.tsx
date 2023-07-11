import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {MaterialIcons} from '@expo/vector-icons';
import * as Location from 'expo-location';
import {Product} from '../../graphql/operations';
import CustomMarker from './custom-marker';
import ProductCarouselItem from './product-carousel-item';
import colors from '../../styles/colors';
import {getMinProductPriceInGel} from '../../utils/price';
import {calculateDistance} from '../../utils/map-distance';
import MapSearchAndFilters from './filter-and-sort/filter-and-sort';
import {ViewToken} from '@react-native/virtualized-lists';

interface SearchResultsMapsProps {
  products: Product[];
}

// const screen = Dimensions.get('window');
// const ASPECT_RATIO = screen.width / screen.height;
// const LATITUDE_DELTA = 0.04;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function animateItemChange(
  selectedPlaceId: string | null,
  flatListRef: React.MutableRefObject<FlatList<Product> | null>,
  products: Product[],
  mapRef: React.MutableRefObject<MapView | null>,
) {
  console.log('selected place id: ', selectedPlaceId);
  if (!selectedPlaceId || !flatListRef) {
    console.log('selectedPlaceId is null');
    return;
  }

  const index = products.findIndex(place => place.id === selectedPlaceId);
  console.log(index);
  if (!flatListRef.current) {
    console.log('flatListRef.current is null');
    return;
  }
  if (index === -1) {
    console.log('index is -1');
    return;
  }
  flatListRef.current.scrollToIndex({index});

  const selectedPlace = products[index];
  if (!selectedPlace.location) {
    return;
  }
  const region = {
    latitude: selectedPlace.location.coordinates.lat,
    longitude: selectedPlace.location.coordinates.lng,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  // Console.log('mapRef.current:', mapRef.current);
  if (!mapRef.current) {
    console.log('mapRef.current is null');
    return;
  }
  mapRef.current.animateToRegion(region);
}

function SearchResultMap({products}: SearchResultsMapsProps) {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(
    products.length > 0 ? products[0].id : null,
  );

  const flatListRef = useRef<FlatList<Product> | null>(null);
  const mapRef = useRef<MapView | null>(null);

  const viewConfig = useRef({itemVisiblePercentThreshold: 100});
  const onViewChanged = useRef(
    ({
      viewableItems,
      changed,
    }: {
      viewableItems: Array<ViewToken>;
      changed: Array<ViewToken>;
    }) => {
      const viewAbleItemsForLog = viewableItems.map(i => ({
        index: i.index,
        key: i.key,
        isView: i.isViewable,
      }));
      const changedItemsForLog = viewableItems.map(i => ({
        index: i.index,
        key: i.key,
        isView: i.isViewable,
      }));
      console.log('viewable items: ', viewAbleItemsForLog);
      console.log('changed: ', changedItemsForLog);

      if (viewableItems.length > 0) {
        const selectedPlace = viewableItems[0].item as Product;
        console.log(
          'selected product: ',
          selectedPlace.id,
          selectedPlace.name.ka,
        );
        setSelectedPlaceId(selectedPlace.id);
      }
    },
  );

  const {width} = useWindowDimensions();
  // Calculate the width of each item in the carousel
  const itemWidth = width - 60;
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const locationPosition = await Location.getCurrentPositionAsync({});
      setLocation(locationPosition);
    })();
  }, []);

  async function goToCurrentLocation() {
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    const currLocation = await Location.getCurrentPositionAsync({});
    mapRef.current?.animateToRegion({
      latitude: currLocation.coords.latitude,
      longitude: currLocation.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  }

  useEffect(() => {
    animateItemChange(selectedPlaceId, flatListRef, products, mapRef);
  }, [selectedPlaceId, products]);
  return (
    <View style={styles.container}>
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
        initialRegion={{
          latitude: 41.8,
          longitude: 44.8,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}>
        {products.map(product => {
          console.log('product: ', product.id);
          return (
            <CustomMarker
              key={product.id}
              coordinate={{
                latitude: product.location?.coordinates.lat || 47.1,
                longitude: product.location?.coordinates.lng || 48.1,
              }}
              price={getMinProductPriceInGel(product) || '10.0'} // TODO: get price
              isSelected={product.id === selectedPlaceId}
              onPress={() => setSelectedPlaceId(product.id)}
            />
          );
        })}
      </MapView>
      <MapSearchAndFilters />
      <TouchableOpacity
        style={styles.currentLocBtn}
        onPress={goToCurrentLocation}>
        <MaterialIcons name="my-location" color={colors.primary} size={25} />
      </TouchableOpacity>
      <View style={styles.carouselListContainer}>
        <FlatList
          ref={flatListRef}
          data={products}
          renderItem={({item}) => (
            <ProductCarouselItem
              product={item}
              cardWidth={itemWidth}
              distance={calculateDistance(location, item.location?.coordinates)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={itemWidth}
          snapToAlignment="center"
          decelerationRate="fast"
          viewabilityConfig={viewConfig.current}
          onViewableItemsChanged={onViewChanged.current}
          // bounces={false}
        />
      </View>
    </View>
  );
}

export default SearchResultMap;

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
    bottom: 135,
    right: 10,
  },
});

// function MyLocation() {
//   return <MaterialIcons style={styles.myLocationIcon} name="my-location" />;
// }
