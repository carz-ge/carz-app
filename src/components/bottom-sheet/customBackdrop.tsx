import React, {useMemo} from 'react';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface CustomBackdropProps extends BottomSheetBackdropProps {
  onPress?: () => void;
}

function CustomBackdrop({animatedIndex, style, onPress}: CustomBackdropProps) {
  // Animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.5],
      Extrapolate.CLAMP,
    ),
  }));

  // Styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: '#000',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  return <Animated.View onTouchEnd={onPress} style={containerStyle} />;
}

export default CustomBackdrop;
