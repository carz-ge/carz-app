import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useCallback, useRef, useState} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop';
import {CarType} from '../../../graphql/operations';
import CustomBackdrop from '../../bottom-sheet/customBackdrop';
import colors from '../../../styles/colors';
import FilterBottomSheetContent from './filter-bottom-sheet-content';

export default function MapFilter() {
  const filterModalRef = useRef<BottomSheetModal>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  function openFilterBottomSheet() {
    filterModalRef.current?.present();
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

  function onFilterButtonClicked(
    date: string | null,
    time: string | null,
    carType: CarType | null,
  ) {
    handleOnClose();
  }
  return (
    <>
      <TouchableOpacity
        onPress={openFilterBottomSheet}
        style={styles.filterContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            size={20}
            name="filter-outline"
            color={colors.primary}
          />
          <Text style={styles.filterText}>ფილტრი</Text>
        </View>
      </TouchableOpacity>
      {/*<CategoryFilter categoryId={categoryId} setCategoryId={setCategoryId} />*/}
      <BottomSheetModal
        ref={filterModalRef}
        index={0}
        snapPoints={['70%']}
        backdropComponent={renderBackdrop}>
        <View>
          <FilterBottomSheetContent
            onFinishButtonPress={onFilterButtonClicked}
          />
        </View>
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: colors.white,
    borderRadius: 50,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  filterText: {
    textAlign: 'center',
    fontSize: 10,
  },
});
