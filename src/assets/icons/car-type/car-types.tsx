import {Image} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import React from 'react';
import {CarType} from '../../../graphql/operations';

// interface CarTypeIconGeneralProps {
//   size: string | number;
//   name: string;
// }
//
// export const CarTypeIcon: React.FC<CarTypeIconGeneralProps> = ({
//   size,
//   name,
// }: CarTypeIconGeneralProps) => {
//   console.log('NAME ->>>', name, size);
//   return (
//     <Image
//       style={{width: size, height: size}}
//       source={
//         require(`../../../assets/images/car-type/${name}.png`) as ImageSourcePropType
//       }
//       resizeMode="contain"
//     />
//   );
// };

interface CarTypeIconProps {
  size: string | number;
}

export const SedanIcon: React.FC<CarTypeIconProps> = ({
  size,
}: CarTypeIconProps) => {
  return (
    <Image
      style={{width: size, height: size}}
      source={
        require('../../../../assets/images/car-type/sedan.png') as ImageSourcePropType
      }
      resizeMode="contain"
    />
  );
};
export const HatchbackIcon: React.FC<CarTypeIconProps> = ({
  size,
}: CarTypeIconProps) => {
  return (
    <Image
      style={{width: size, height: size}}
      source={
        require('../../../../assets/images/car-type/hatchback.png') as ImageSourcePropType
      }
      resizeMode="contain"
    />
  );
};
export const SuvIcon: React.FC<CarTypeIconProps> = ({
  size,
}: CarTypeIconProps) => {
  return (
    <Image
      style={{width: size, height: size}}
      source={
        require('../../../../assets/images/car-type/suv.png') as ImageSourcePropType
      }
      resizeMode="contain"
    />
  );
};
export const VanIcon: React.FC<CarTypeIconProps> = ({
  size,
}: CarTypeIconProps) => {
  return (
    <Image
      style={{width: size, height: size}}
      source={
        require('../../../../assets/images/car-type/van.png') as ImageSourcePropType
      }
      resizeMode="contain"
    />
  );
};
export const TruckIcon: React.FC<CarTypeIconProps> = ({
  size,
}: CarTypeIconProps) => {
  return (
    <Image
      style={{width: size, height: size}}
      source={
        require('../../../../assets/images/car-type/truck.png') as ImageSourcePropType
      }
      resizeMode="contain"
    />
  );
};

export const MotorcycleIcon: React.FC<CarTypeIconProps> = ({
  size,
}: CarTypeIconProps) => {
  return (
    <Image
      style={{width: size, height: size}}
      source={
        require('../../../../assets/images/car-type/motorcycle.png') as ImageSourcePropType
      }
      resizeMode="contain"
    />
  );
};

export const MotorcycleIconALLAndOther: React.FC<CarTypeIconProps> = ({
  size,
}: CarTypeIconProps) => {
  return <SedanIcon size={size} />;
};
export const CarTypeToIconMap: Record<CarType, React.FC<CarTypeIconProps>> = {
  [CarType.All]: MotorcycleIconALLAndOther,
  [CarType.Other]: MotorcycleIconALLAndOther,
  [CarType.Sedan]: SedanIcon,
  [CarType.Hatchback]: HatchbackIcon,
  [CarType.Suv]: SuvIcon,
  [CarType.Van]: VanIcon,
  [CarType.Truck]: TruckIcon,
  [CarType.Motorcycle]: MotorcycleIcon,
};
