import React from 'react';
import {Image, StyleSheet, View, ImageSourcePropType} from 'react-native';

function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/splash.png') as ImageSourcePropType}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
