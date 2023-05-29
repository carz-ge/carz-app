import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CategoryList from '../../../../components/category/category-list';

export default () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <CategoryList />

        {/* Popular */}
        <View style={styles.popularWrapper}>
          <Text style={styles.popularTitle}>პოპულარული</Text>
        </View>
        {/* TODO */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  popularWrapper: {
    paddingHorizontal: 20,
  },
  popularTitle: {
    fontSize: 16,
  },
});
