import React, {useCallback, useRef} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ProductPackage} from '../../graphql/operations';
import Colors from '../../styles/colors';
import {Feather, FontAwesome5, Ionicons} from '@expo/vector-icons';
import {getPriceRangeForPackage} from '../../utils/price';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CustomBackdrop from '../bottom-sheet/customBackdrop';
import PackageInfo from './package-details';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop';
import colors from '../../styles/colors';

type PackageCardProps = {
  productPackage: ProductPackage;
  onPackageSelected: (packageId: string | null) => void;
  isSelected: boolean;
};

export function PackageCard({
  productPackage,
  isSelected,
  onPackageSelected,
}: PackageCardProps) {
  const infoModalRef = useRef<BottomSheetModal>(null);

  const handlePress = () => {
    if (isSelected) {
      onPackageSelected(null);
      return;
    }
    onPackageSelected(productPackage.id);
  };
  const priceInGel = getPriceRangeForPackage(
    productPackage.pricesForCarTypes || [],
  );

  function handleWhatsIncludedPress() {
    infoModalRef.current?.present();
  }

  const handleOnClose = useCallback(() => {
    infoModalRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <CustomBackdrop onPress={handleOnClose} {...props} />
    ),
    [handleOnClose],
  );

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.packageCard, isSelected && styles.packageCardSelected]}>
      <View>
        {/* Name */}
        <Text style={styles.packageTitle}>{productPackage.name.ka}</Text>
        {/* Time */}
        <View
          style={{
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Ionicons size={20} name="time" />
          <Text style={{marginLeft: 8}}>
            {productPackage.averageDurationMinutes} წთ
          </Text>
        </View>
        {/* Additional Details */}
        <Pressable onPress={handleWhatsIncludedPress}>
          <Text style={styles.whatsIncluded}>რას მოიცავს სერვისი?</Text>
        </Pressable>
      </View>

      <View style={{flexDirection: 'column', width: 150}}>
        {/* minimum price */}
        {isSelected ? (
          <View style={styles.selectedTextComponent}>
            <Feather size={15} color={'green'} name={'check-circle'} />
            <Text>დამატებულია</Text>
          </View>
        ) : (
          <View style={styles.priceTextComponent}>
            <FontAwesome5 size={15} name={'money-bill'} />
            <Text>{priceInGel} ლარი</Text>
          </View>
        )}

        {/* book now button */}
        <View style={styles.selectButton}>
          <Text style={styles.selectButtonText}>
            {isSelected ? 'წაშლა' : 'არჩევა'}
          </Text>
        </View>
      </View>
      <BottomSheetModal
        ref={infoModalRef}
        index={0}
        snapPoints={['40%', '70%']}
        backdropComponent={renderBackdrop}>
        <PackageInfo productPackage={productPackage} />
      </BottomSheetModal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  packageCard: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderColor: '#dfdfdf',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // minHeight: 110,
  },
  packageCardSelected: {
    borderWidth: 2,
    borderColor: Colors.black,
    backgroundColor: '#F5F5F5',
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  selectButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
    width: '100%',
  },
  selectButtonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  whatsIncluded: {
    textDecorationLine: 'underline',
  },
  infoModalHeader: {
    textAlign: 'center',
    fontSize: 15,
  },
  selectedTextComponent: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#E0FEF2',
    padding: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceTextComponent: {
    flexDirection: 'row',
    padding: 2,
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    paddingLeft: 15,
  },
});
