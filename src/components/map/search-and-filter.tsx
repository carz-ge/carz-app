import * as React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import colors from '../../styles/colors';
import {useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CustomBackdrop from '../cutomBackdrop/customBackdrop';
import FilterBottomSheet from './filter/filter-bottom-sheet';
import {CarType} from '../../graphql/operations';

export default function MapSearchAndFilters() {
  const filterModalRef = useRef<BottomSheetModal>(null);

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
      <BottomSheetModal
        ref={filterModalRef}
        index={0}
        snapPoints={['95%']}
        backdropComponent={CustomBackdrop}>
        <View>
          <Text style={styles.filterText}>აირჩიე</Text>
          <FilterBottomSheet onFinishButtonPress={onFilterButtonClicked} />
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
