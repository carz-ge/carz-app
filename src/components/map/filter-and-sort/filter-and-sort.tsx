import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useListCategories} from '../../../graphql/operations';
import {CategoryMapItem} from '../../category/category-map-item';
import MapFilter from './map-filter';
import MapSortBy from './map-sort-by';

interface CategoryFilterProps {
  categoryId: string | null;
  setCategoryId: (categoryId: string | null) => void;
}

function CategoryFilter({categoryId, setCategoryId}: CategoryFilterProps) {
  const {data, loading, error} = useListCategories({
    fetchPolicy: 'network-only',
  });
  if (loading || error) {
    return null;
  }

  return (
    <View>
      {!loading && (
        <FlatList
          data={data?.listCategories}
          renderItem={({item, index}) => (
            <CategoryMapItem
              category={item}
              index={index}
              isSelected={item.id === categoryId}
              onPress={() => {
                if (item.id === categoryId) {
                  setCategoryId(null);
                  return;
                }
                setCategoryId(item.id);
              }}
            />
          )}
          keyExtractor={item => item.id}
          horizontal={true}
        />
      )}
    </View>
  );
}

export default function MapSearchAndFilters() {
  return (
    <View style={styles.container}>
      <MapFilter />
      <MapSortBy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginTop: 30,
    flex: 1,
    flexDirection: 'row',
  },
});
