import {View, StyleSheet} from 'react-native';
import React from 'react';
import LottieView, {AnimationObject} from 'lottie-react-native';
import colors from '../../styles/colors';

interface SuccessAnimationProps {
  onFinish?: () => void;
}

export default function SuccessAnimation({onFinish}: SuccessAnimationProps) {
  const localSource =
    require('../../animations/success.json') as AnimationObject;

  return (
    <View style={styles.container}>
      <LottieView
        key={`success`}
        source={localSource}
        autoPlay={true}
        loop={false}
        style={styles.lottie}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  controlsContainer: {flexDirection: 'row', marginTop: 24, columnGap: 12},
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  text: {color: 'white'},
  lottie: {width: 200, height: 200},
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
