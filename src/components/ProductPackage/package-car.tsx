import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ProductDetails} from '../../graphql/operations';
import Colors from '../../styles/colors';

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

  return (
    <View
      style={[styles.packageCard, isSelected && styles.packageCardSelected]}>
      <View>
        {/* Name */}
        <Text style={styles.packageTitle}>{productPackage.name.ka}</Text>
        {/* Time */}
        <Text>{productPackage.averageDurationMinutes} წთ</Text>
        {/* Additional Details */}
        <Text>რას მოიცავს სერვისი?</Text>
      </View>

      <View>
        {/* Price */}
        {/* TODO: Add price information */}
      </View>

      <Pressable
        style={styles.selectButton}
        onPress={handlePress}
        android_ripple={{color: 'lightgray'}}>
        <Text style={styles.selectButtonText}>
          {isSelected ? 'გამოიყენეთ' : 'არჩევა'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  packageCard: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  packageCardSelected: {
    backgroundColor: Colors.primary,
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
});
