import React from 'react';
import {Category} from '../../graphql/operations';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ImageStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {Image} from 'react-native';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import colors from '../../styles/colors';

const CategoryToIconMap: Record<string, any> = {
  CAR_WASH: {
    name: 'car-wash',
    Icons: MaterialCommunityIcons,
  },
  CAR_CLEANING: {
    name: 'car-sport',
    Icons: Ionicons,
  },
  PARKING: {
    name: 'parking',
    Icons: FontAwesome,
  },
};

interface CategoryImageProps {
  item: Category;
  style: StyleProp<ImageStyle>;
}

export default function CategoryImage({item, style}: CategoryImageProps) {
  if (item.image) {
    return <Image source={{uri: item.image}} style={style} />;
  }
  const icon = CategoryToIconMap[item.internalName];
  if (icon) {
    return (
      <icon.Icons
        name={icon.name}
        size={50}
        style={[style, {color: colors.primary}]}
      />
    );
  }
  return <></>;
}
