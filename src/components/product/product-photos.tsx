import React from 'react';
import {Text, View, Image, Dimensions, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
  },
  slide: {},
  image: {
    width,
    height: 200,
  },
  paginationStyle: {
    position: 'absolute',
    top: 150,
    right: 10,
  },
  paginationText: {
    color: 'white',
    fontSize: 20,
  },
});

function renderPagination(index: number, total: number, swiper: Swiper) {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{color: 'grey'}}>
        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
      </Text>
    </View>
  );
}

interface ProductPhotosProps {
  images: string[];
}

export default function ProductPhotos({images}: ProductPhotosProps) {
  return (
    <Swiper
      style={styles.wrapper}
      renderPagination={renderPagination}
      loop={false}>
      {images.map((image, index) => (
        <View key={`${image}-${index}`} style={styles.slide}>
          <Image style={styles.image} source={{uri: image}} />
        </View>
      ))}
    </Swiper>
  );
}
