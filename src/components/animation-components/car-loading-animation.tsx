import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import LottieView, {AnimationObject} from 'lottie-react-native';
import colorFilter from './color-filter';

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
    paddingVertical: 32,
  },
  lottie: {width: 20, height: 200},
});
