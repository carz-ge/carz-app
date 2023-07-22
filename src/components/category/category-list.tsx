import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core/src/types';
import {Category, useListCategories} from '../../graphql/operations';
import colors from '../../styles/colors';
import {RootStackParamList} from '../../navigation/types';
import CustomActivityIndicator from '../activity-indicator/custom-activity-indicator';

const PLACE_HOLDER_IMAGE =
  'https://images.unsplash.com/photo-1608506375591-b90e1f955e4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80';

export default function CategoryList() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {data, loading, error} = useListCategories({
    fetchPolicy: 'network-only',
  });

  console.log('useListCategories', data, loading, error);
  const onPress = (category: Category) => {
    if (category.internalName === 'AUTO_STATIONS') {
      navigation.navigate('stationsMap');
    } else {
      navigation.navigate('mainTabs', {
        screen: 'map',
        params: {
          categoryId: category.id,
        },
      });
    }
  };
  return (
    <View style={styles.categoriesWrapper}>
      <Text style={styles.categoriesTitle}>კატეგორიები</Text>
      <View style={styles.categoriesListWrapper}>
        {!loading &&
          data?.listCategories.map((item, index) => {
            return (
              <RenderCategoryItem
                key={item.id}
                onPress={onPress}
                category={item}
                index={index}
              />
            );
          })}
        {/* TODO Render skeletons */}
        {loading && <CustomActivityIndicator />}
      </View>
    </View>
  );
}

function RenderCategoryItem({
  onPress,
  category,
  index,
}: {
  category: Category;
  onPress: (category: Category) => void;
  index: number;
}) {
  return (
    <Pressable
      onPress={() => onPress(category)}
      style={styles.categoryItemContainer}>
      <ImageBackground
        source={{
          uri: category.image ?? PLACE_HOLDER_IMAGE,
        }}
        resizeMode="cover"
        style={[styles.categoryItem]}>
        <View style={styles.overlay} />
        <Text style={styles.categoryItemTitle}>{category.name.ka}</Text>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  categoriesWrapper: {
    marginTop: 0,
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
  categoryItem: {
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
  categoryItemContainer: {
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
