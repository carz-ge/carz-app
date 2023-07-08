import {ProductDetails} from '../../graphql/operations';
import React, {useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../styles/colors';
import CustomBackdrop from '../cutomBackdrop/customBackdrop';
import {PackageCard} from '../ProductPackage/package-card';

interface ShowAllPackagesButtonProps {
  packages: ProductDetails[];
  selectPackage: (packageId: string | null) => void;
  selectedPackageId: string | null;
}
export default function ShowAllPackagesButton({
  packages,
  selectPackage,
  selectedPackageId,
}: ShowAllPackagesButtonProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <TouchableOpacity
        onPress={() => bottomSheetModalRef.current?.present()}
        style={styles.showAllButton}>
        <Text style={styles.showAllText}>
          ნახე ყველა პაკეტი ({packages.length})
        </Text>
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['95%']}
        backdropComponent={CustomBackdrop}>
        <View style={styles.bottomSheetModalContainer}>
          <View>
            {packages.map((productPackage: ProductDetails) => (
              <PackageCard
                key={productPackage.id}
                productPackage={productPackage}
                onPackageSelected={selectPackage}
                isSelected={productPackage.id === selectedPackageId}
              />
            ))}
          </View>

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
