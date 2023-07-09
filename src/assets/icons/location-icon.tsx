import React from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {IconProps} from './base';

export const MapLocationIcon: React.FC<IconProps> = ({size}: IconProps) => {
  return <Icon name="map-marker-radius" size={size} />;
};
