import React, {useRef} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ProductDetails} from '../../graphql/operations';
import Colors from '../../styles/colors';
import {Feather, FontAwesome5, Ionicons} from '@expo/vector-icons';
import {getPriceRangeForPackage} from '../../utils/price';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CustomBackdrop from '../cutomBackdrop/customBackdrop';
import PackageInfo from './package-details';

type PackageCardProps = {
  productPackage: ProductDetails;
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
  return (
    <View
      style={[styles.packageCard, isSelected && styles.packageCardSelected]}>
      <View>
        {/* Name */}
        <Text style={styles.packageTitle}>{productPackage.name.ka}</Text>
        {/* Time */}
        <View
          style={{
            flexDirection: 'row',
            gap: 1,
          }}>
          <Ionicons size={20} name="time" />
          <Text>{productPackage.averageDurationMinutes} წთ</Text>
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
        <TouchableOpacity style={styles.selectButton} onPress={handlePress}>
          <Text style={styles.selectButtonText}>
            {isSelected ? 'წაშლა' : 'არჩევა'}
          </Text>
        </TouchableOpacity>
      </View>
      <BottomSheetModal
        ref={infoModalRef}
        index={0}
        snapPoints={['40%', '70%']}
        backdropComponent={CustomBackdrop}>
        <PackageInfo productPackage={productPackage} />
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  packageCard: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderColor: Colors.grayLight,
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
    backgroundColor: 'lightblue',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  selectButtonText: {
    fontWeight: 'bold',
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
  },
});
