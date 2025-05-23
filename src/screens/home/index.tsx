import React from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CategoryList from '../../components/category/category-list';
import {MainTabStackScreenProps} from '../../navigation/types';
import ProfileIcon from '../../components/profile/profile-icon';
import {StatusBar} from 'expo-status-bar';
import colors from '../../styles/colors';

export default function HomeScreen({
  navigation,
}: MainTabStackScreenProps<'home'>) {
  console.log('HOME');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        {/* Profile icon */}
        <View
          style={[
            styles.profileStyle,
            Platform.OS === 'android' ? {marginTop: 20} : {},
          ]}>
          <ProfileIcon onClick={() => navigation.navigate('profile')} />
        </View>

        {/* Categories */}
        <CategoryList />

        {/* Popular */}
        <View style={styles.popularWrapper}>
          <Text style={styles.popularTitle}>პოპულარული</Text>
        </View>
        <Pressable
          style={{margin: 10}}
          onPress={() =>
            navigation.navigate('payment', {
              redirectUrl: 'https://carz.ge',
              orderId: '123',
            })
          }>
          <Text style={styles.popularTitle}>Test WebView</Text>
        </Pressable>
        <Pressable
          style={{margin: 10}}
          onPress={() =>
            navigation.navigate('paymentStatus', {
              success: true,
              orderId: '123',
            })
          }>
          <Text style={styles.popularTitle}>Test Payment Status</Text>
        </Pressable>
        {/* TODO */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  popularWrapper: {
    paddingHorizontal: 20,
  },
  popularTitle: {
    fontSize: 16,
  },
  profileStyle: {
    marginTop: 0,
    marginRight: 20,
    flex: 1,
    alignItems: 'flex-end',
  },
});
