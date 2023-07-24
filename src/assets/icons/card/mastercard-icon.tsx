import React from 'react';
import {Image} from 'expo-image';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

interface CardIssuerIconProps {
  size: number;
}

export const MasterCardIcon: React.FC<CardIssuerIconProps> = ({
  size,
}: CardIssuerIconProps) => {
  return (
    <Image
      style={{width: size, height: size}}
      source={
        require('../../../../assets/images/card/mastercard.png') as ImageSourcePropType
      }
      resizeMode="contain"
    />
  );
};

export const CardIssuerToIconMap: Record<
  string,
  React.FC<CardIssuerIconProps>
> = {
  mc: MasterCardIcon,
};
