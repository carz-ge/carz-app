import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../styles/colors';
import {useCallback, useRef, useState} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop';
import CustomBackdrop from '../../bottom-sheet/customBackdrop';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import SortBottomSheetContent from './sort-bottom-sheet-content';
import {SortByEnum} from '../../../store/slice/searchSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function MapSortBy() {
  const filterModalRef = useRef<BottomSheetModal>(null);
  const [sortBy, setSortBy] = useState<SortByEnum>(SortByEnum.POPULARITY);
  const edgeInsets = useSafeAreaInsets();

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

  function onFilterButtonClicked() {
    handleOnClose();
  }
  return (
    <>
      <TouchableOpacity
        onPress={openFilterBottomSheet}
        style={[styles.container, {marginTop: edgeInsets.top}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            size={20}
            name="sort-variant"
            color={colors.primary}
          />
          <Text style={styles.filterText}>სორტი</Text>
        </View>
      </TouchableOpacity>
      {/*<CategoryFilter categoryId={categoryId} setCategoryId={setCategoryId} />*/}
      <BottomSheetModal
        ref={filterModalRef}
        index={0}
        snapPoints={['70%']}
        backdropComponent={renderBackdrop}>
        <View>
          <SortBottomSheetContent
            sortBy={sortBy}
            setSortBy={setSortBy}
            onFinishButtonPress={onFilterButtonClicked}
          />
        </View>
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 50,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  filterText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'helv-65',
    marginLeft: 5,
  },
});
