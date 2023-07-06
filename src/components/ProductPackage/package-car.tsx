import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ProductDetails} from '../../graphql/operations';
import Colors from '../../styles/colors';
import {FontAwesome5, Ionicons} from '@expo/vector-icons';
import {getPriceRangeForPackage} from '../../utils/price';

type PackageCardProps = {
  productPackage: ProductDetails;
  onPressed: (packageId: string | null) => void;
  isSelected: boolean;
};

export function PackageCard({
  productPackage,
  isSelected,
  onPressed,
}: PackageCardProps) {
  const handlePress = () => {
    if (isSelected) {
      onPressed(null);
      return;
    }
    onPressed(productPackage.id);
  };
  const priceInGel = getPriceRangeForPackage(
    productPackage.pricesForCarTypes || [],
  );

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
        <Text style={styles.whatsIncluded}>რას მოიცავს სერვისი?</Text>
      </View>

      <View style={{flexDirection: 'column', width: 150}}>
        {/* minimum price */}
        {isSelected ? (
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              backgroundColor: '#E0FEF2',
              padding: 2,
              borderRadius: 5,
            }}>
            <FontAwesome5 size={15} name={'check'} />
            <Text>დამატებულია</Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              padding: 2,
              gap: 5,
            }}>
            <FontAwesome5 size={15} name={'money-bill'} />
            <Text>{priceInGel} ლარი</Text>
          </View>
        )}

        {/* book now button */}
        <Pressable
          style={styles.selectButton}
          onPress={handlePress}
          android_ripple={{color: 'lightgray'}}>
          <Text style={styles.selectButtonText}>
            {isSelected ? 'წაშლა' : 'არჩევა'}
          </Text>
        </Pressable>
      </View>
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
});
