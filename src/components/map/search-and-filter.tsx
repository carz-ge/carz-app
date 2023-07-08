import * as React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import colors from '../../styles/colors';
import {useCallback, useRef, useState} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CustomBackdrop from '../bottom-sheet/customBackdrop';
import FilterBottomSheetContent from './filter/filter-bottom-sheet-content';
import {CarType, useListCategories} from '../../graphql/operations';
import {CategoryMapItem} from '../category/category-map-item';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop';

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
  const filterModalRef = useRef<BottomSheetModal>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  function openFilterBottomSheet() {
    filterModalRef.current?.present();
  }

  function onFilterButtonClicked(
    date: string | null,
    time: string | null,
    carType: CarType | null,
  ) {
    Alert.alert(
      'ფილტრი',
      `თქვენი ფილტრი: ${date || 'no date'}, ${time || 'no time'}, ${
        carType || 'no car Type'
      }`,
    );
  }

  const handleOnClose = useCallback(() => {
    filterModalRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <CustomBackdrop onPress={handleOnClose} {...props} />
    ),
    [handleOnClose],
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={openFilterBottomSheet}
        style={styles.filterContainer}>
        <MaterialCommunityIcons
          size={30}
          name="filter-outline"
          color={colors.primary}
        />
      </TouchableOpacity>
      <CategoryFilter categoryId={categoryId} setCategoryId={setCategoryId} />
      <BottomSheetModal
        ref={filterModalRef}
        index={0}
        snapPoints={['70%']}
        backdropComponent={renderBackdrop}>
        <View>
          <Text style={styles.filterText}>აირჩიე</Text>
          <FilterBottomSheetContent
            onFinishButtonPress={onFilterButtonClicked}
          />
        </View>
      </BottomSheetModal>
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
  filterContainer: {
    backgroundColor: colors.white,
    borderRadius: 50,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  filterText: {
    textAlign: 'center',
    fontSize: 20,
  },
});
