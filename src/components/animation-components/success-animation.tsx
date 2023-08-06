import {View, StyleSheet} from 'react-native';
import React from 'react';
import LottieView, {AnimationObject} from 'lottie-react-native';
import colorFilter from './color-filter';

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
  lottie: {width: 200, height: 200},
});
