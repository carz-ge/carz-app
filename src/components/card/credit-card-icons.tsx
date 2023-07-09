import {Image, ImageBackground, StyleSheet} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import React from 'react';
import colors from '../../styles/colors';

interface CardIconProps {
  size: string | number;
}

export const MasterCardIcon: React.FC<CardIconProps> = ({
  size,
}: CardIconProps) => {
  return (
    <Image
      style={{width: size, height: size}}
      source={
        require('../../../assets/images/card/mastercard.png') as ImageSourcePropType
      }
      resizeMode="contain"
    />
  );
};

interface CardBackgroundProps {
  children: React.ReactNode;
}
export function CardBackground({children}: CardBackgroundProps) {
  return (
    <ImageBackground
      source={
        require('../../../assets/images/card/background.png') as ImageSourcePropType
      }
      style={[styles.cardItem]}
      resizeMode="cover">
      {children}
    </ImageBackground>
  );
}

export const CardIssuerToIconMap: Record<string, React.FC<CardIconProps>> = {
  mc: MasterCardIcon,
};

const styles = StyleSheet.create({
  cardItem: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingVertical: 15,
    height: 120,
    position: 'relative',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,

    // elevation: 2,
  },
});
