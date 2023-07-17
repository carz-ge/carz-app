import React from 'react';
import {Text, View, Image, Dimensions, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import colors from '../../styles/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    height: 250,
  },
  slide: {},
  image: {
    width,
    height: 250,
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
  },
  paginationText: {
    color: colors.primary,
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
