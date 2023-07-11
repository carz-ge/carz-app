import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import LottieView, {AnimationObject} from 'lottie-react-native';
import colors from '../../styles/colors';

interface CarLoadingAnimationProps {
  onFinish?: () => void;
  style?: StyleProp<ViewStyle>;
  loop?: boolean;
}

export default function CarLoadingAnimation({
  onFinish,
  style,
}: CarLoadingAnimationProps) {
  const localSource =
    require('../../animations/car-revolving-animation.json') as AnimationObject;

  return (
    <View style={styles.container}>
      <LottieView
        key={`fail`}
        source={localSource}
        autoPlay={true}
        loop={true}
        style={style ?? styles.lottie}
        resizeMode={'contain'}
        colorFilters={colorFilter}
        enableMergePathsAndroidForKitKatAndAbove
        onAnimationFinish={onFinish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {width: 20, height: 200},
});

const colorFilter = [
  {
    keypath: 'BG',
    color: colors.primary,
  },
  {
    keypath: 'O-B',
    color: colors.secondary,
  },
  {
    keypath: 'L-B',
    color: colors.secondary,
  },
  {
    keypath: 'T1a-Y 2',
    color: colors.secondary,
  },
  {
    keypath: 'T1b-Y',
    color: colors.secondary,
  },
  {
    keypath: 'T2b-B',
    color: colors.secondary,
  },
  {
    keypath: 'T2a-B',
    color: colors.secondary,
  },
  {
    keypath: 'I-Y',
    color: colors.secondary,
  },
  {
    keypath: 'E1-Y',
    color: colors.secondary,
  },
  {
    keypath: 'E2-Y',
    color: colors.secondary,
  },
  {
    keypath: 'E3-Y',
    color: colors.secondary,
  },
];
