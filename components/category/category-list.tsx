import CategoryWrapper from '../../lib/types/category-wrapper';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useListCategories} from '../../graphql/operations';
import colors from '../../lib/styles/colors';
import CategoryImage from './category-image';
import {Feather} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import {Router} from '@react-navigation/native';

export default function CategoryList() {
  const router = useRouter();

  const {data, loading, error} = useListCategories({
    fetchPolicy: 'cache-and-network',
  });

  console.log('useListCategories', data, loading, error);

  return (
    <View style={styles.categoriesWrapper}>
      <Text style={styles.categoriesTitle}>კატეგორიები</Text>
      {!loading && (
        <View style={styles.categoriesListWrapper}>
          <FlatList
            data={data?.listCategories.map((category, index) => ({
              index,
              category,
            }))}
            renderItem={item => RenderCategoryItemWrapper(router, item.item)}
            keyExtractor={item => item.category.id}
            horizontal={true}
          />
        </View>
      )}
      {/* TODO */}
      {loading && <Text>loading</Text>}
    </View>
  );
}

function RenderCategoryItemWrapper(router: any, item: CategoryWrapper) {
  return (
    <Pressable
      onPress={() => {
        router.push(`/search/${item.category.id}`);
      }}>
      <RenderCategoryItem item={item} />
    </Pressable>
  );
}

const RenderCategoryItem = ({item}: {item: CategoryWrapper}) => {
  return (
    <View
      style={[
        styles.categoryItemWrapper,
        {
          backgroundColor: colors.white,
          marginLeft: item.index === 0 ? 20 : 0,
        },
      ]}>
      <CategoryImage item={item.category} style={styles.categoryItemImage} />
      <Text style={styles.categoryItemTitle}>{item.category.name.ka}</Text>
      <View
        style={[
          styles.categorySelectWrapper,
          {
            backgroundColor: colors.primary,
          },
        ]}>
        <Feather
          name="chevron-right"
          size={8}
          style={styles.categorySelectIcon}
          color={colors.white}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesWrapper: {
    marginTop: 30,
  },
  categoriesTitle: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  categoriesListWrapper: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  categoryItemWrapper: {
    marginRight: 20,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  categoryItemImage: {
    width: 60,
    height: 60,
    marginTop: 25,
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  categoryItemTitle: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
    color: colors.black,
  },
  categorySelectWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 26,
    height: 26,
    borderRadius: 26,
    marginBottom: 20,
  },
  categorySelectIcon: {
    alignSelf: 'center',
  },
});
