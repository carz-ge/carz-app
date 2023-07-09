import React from 'react';
import {IconProps} from './base';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export const StarIcon: React.FC<IconProps> = ({size}: IconProps) => {
  return <Icon name="star" size={size} />;
};
