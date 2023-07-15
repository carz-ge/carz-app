import {ProductPackage} from '../../graphql/operations';
import React, {useCallback, useRef} from 'react';
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../styles/colors';
import CustomBackdrop from '../bottom-sheet/customBackdrop';
import {PackageCard} from '../ProductPackage/package-card';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop';

interface ShowAllPackagesButtonProps {
  packages: ProductPackage[];
  selectPackage: (packageId: string | null) => void;
  selectedPackageId: string | null;
}
export default function ShowAllPackagesButton({
  packages,
  selectPackage,
  selectedPackageId,
}: ShowAllPackagesButtonProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleOnClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <CustomBackdrop onPress={handleOnClose} {...props} />
    ),
    [handleOnClose],
  );
  return (
    <>
      <TouchableOpacity
        onPress={() => bottomSheetModalRef.current?.present()}
        style={styles.showAllButton}>
        <Text style={styles.showAllText}>ყველა პაკეტი ({packages.length})</Text>
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['95%']}
        backdropComponent={renderBackdrop}>
        <View style={styles.bottomSheetModalContainer}>
          <BottomSheetScrollView>
            {packages.map((productPackage: ProductPackage) => (
              <PackageCard
                key={productPackage.id}
                productPackage={productPackage}
                onPackageSelected={selectPackage}
                isSelected={productPackage.id === selectedPackageId}
              />
            ))}
          </BottomSheetScrollView>

          <TouchableOpacity
            onPress={() => bottomSheetModalRef.current?.close()}
            style={styles.closeButton}>
            <Text style={styles.closeButtonText}>
              {selectedPackageId ? 'არჩევა' : 'დახურვა'}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  showAllButton: {
    padding: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  showAllText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSheetModalContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  closeButton: {
    padding: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
