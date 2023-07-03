import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Category, useListCategories} from '../../graphql/operations';
import colors from '../../styles/colors';
import CategoryImage from './category-image';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core/src/types';
import {RootStackParamList} from '../../navigation/types';

export default function CategoryList() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {data, loading, error} = useListCategories({
    fetchPolicy: 'network-only',
  });

  console.log('useListCategories', data, loading, error);

  return (
    <View style={styles.categoriesWrapper}>
      <Text style={styles.categoriesTitle}>კატეგორიები</Text>
      <View style={styles.categoriesListWrapper}>
        {!loading && (
          <FlatList
            data={data?.listCategories}
            renderItem={({item, index}) => (
              <RenderCategoryItemWrapper
                navigation={navigation}
                item={item}
                index={index}
              />
            )}
            keyExtractor={item => item.id}
            horizontal={false}
          />
        )}
        {/* TODO Remder skeletons */}
        {loading && <Text>loading</Text>}
      </View>
    </View>
  );
}

function RenderCategoryItemWrapper({
  navigation,
  item,
  index,
}: {
  navigation: any;
  item: Category;
  index: number;
}) {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('search', {
          screen: 'chooseCar',
          params: {
            categoryId: item.id,
          },
        });
      }}
      style={styles.categoryItem}>
      <RenderCategoryItem item={item} index={index} />
    </Pressable>
  );
}

const RenderCategoryItem = ({item, index}: {item: Category; index: number}) => {
  return (
    <ImageBackground
      source={{
        uri:
          index === 0
            ? 'https://images.unsplash.com/photo-1608506375591-b90e1f955e4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
            : 'https://plus.unsplash.com/premium_photo-1661909961389-7d501737abde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2059&q=80',
      }}
      resizeMode="cover"
      style={[styles.categoryItemWrapper]}>
      <View style={styles.overlay} />
      {/* <CategoryImage item={item} style={styles.categoryItemImage} /> */}
      <Text style={styles.categoryItemTitle}>{item.name.ka}</Text>
      {/* <View
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
      </View> */}
    </ImageBackground>
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
    fontFamily: 'helv-65',
  },
  categoriesListWrapper: {
    paddingTop: 15,
    marginBottom: 20,
    flexDirection: 'column',
    paddingHorizontal: 15,
  },
  categoryItemWrapper: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingVertical: 15,
    height: 120,
    position: 'relative',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,

    // elevation: 2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 120,
    backgroundColor: '#000',
    zIndex: 1,
    opacity: 0.7,
  },
  categoryItem: {
    width: '100%',
  },
  categoryItemTitle: {
    textAlign: 'center',
    fontSize: 30,
    color: colors.white,
    fontFamily: 'helv-65',
    zIndex: 3,
    paddingLeft: 25,
  },
  categorySelectWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 26,
    height: 26,
    borderRadius: 26,
    paddingHorizontal: 15,
  },
  categorySelectIcon: {
    alignSelf: 'center',
  },
});
