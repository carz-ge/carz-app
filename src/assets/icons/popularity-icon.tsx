import React from 'react';
import {Image} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import {IconProps} from './base';

export const PopularityIcon: React.FC<IconProps> = ({size}: IconProps) => {
  return (
    <Image
      style={{width: size, height: size}}
      source={
        require('../../../assets/images/icons/popularity.png') as ImageSourcePropType
      }
      resizeMode="contain"
    />
  );
};
