import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Platform, useWindowDimensions, View} from 'react-native';
import {Product} from '../../graphql/operations';
import CustomMarker from './custom-marker';
import ProductCarouselItem from './product-carousel-item';

interface SearchResultsMapsProps {
  products: Product[];
}

const SearchResultMap = ({products}: SearchResultsMapsProps) => {
  if (Platform.OS === 'web') {
    return <></>;
  }
  const MapView = require('react-native-maps').default;

  const PROVIDER_GOOGLE = require('react-native-maps').PROVIDER_GOOGLE;

  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const flatlist = useRef<FlatList<Product> | null>(null);
  const map = useRef<typeof MapView | null>(null);

  const viewConfig = useRef({itemVisiblePercentThreshold: 100});
  const onViewChanged = useRef(
    ({viewableItems}: {viewableItems: {item: Product}[]}) => {
      console.log('viewable items: ', typeof viewableItems, viewableItems);
      if (viewableItems.length > 0) {
        const selectedPlace = viewableItems[0].item;
        console.log('selected place: ', selectedPlace);
        setSelectedPlaceId(selectedPlace.id);
      }
    },
  );

  const width = useWindowDimensions().width;

  useEffect(() => {
    console.log('selected place id: ', selectedPlaceId);
    if (!selectedPlaceId || !flatlist) {
      console.log('selectedPlaceId is null');
      return;
    }

    const index = products.findIndex(place => place.id === selectedPlaceId);
    console.log(index);
    if (!flatlist.current) {
      console.log('flatlist.current is null');
      return;
    }
    if (index === -1) {
      console.log('index is -1');
      return;
    }
    flatlist.current.scrollToIndex({index});

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
    // console.log('map.current:', map.current);
    if (!map.current) {
      console.log('map.current is null');
      return;
    }
    map.current.animateToRegion(region);
  }, [selectedPlaceId, products]);
  console.log('search results maps: ');
  return (
    <View style={{width: '100%', height: '100%'}}>
      <MapView
        ref={map}
        style={{width: '100%', height: '100%'}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 41.8,
          longitude: 44.8,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}>
        {products.map(place => {
          console.log('place: ', place);
          return (
            <CustomMarker
              key={place.id}
              coordinate={{
                latitude: place.location?.coordinates.lat || 47.1,
                longitude: place.location?.coordinates.lng || 48.1,
              }}
              price={10} // TODO: get price
              isSelected={place.id === selectedPlaceId}
              onPress={() => setSelectedPlaceId(place.id)}
            />
          );
        })}
      </MapView>
      <View style={{position: 'absolute', bottom: 10}}>
        <FlatList
          ref={flatlist}
          data={products}
          renderItem={({item}) => <ProductCarouselItem product={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width - 60}
          snapToAlignment={'center'}
          decelerationRate={'fast'}
          viewabilityConfig={viewConfig.current}
          onViewableItemsChanged={onViewChanged.current}
        />
      </View>
    </View>
  );
};

export default SearchResultMap;
