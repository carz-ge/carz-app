import {ProductDetails} from '../../graphql/operations';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface PackageCarProps {
  isSelected: boolean;
  productPackage: ProductDetails;
  onPressed: (packageId: string) => void;
}

export function PackageCard({
  productPackage,
  isSelected,
  onPressed,
}: PackageCarProps) {
  return (
    <View>
      <View>
        {/* name */}
        <Text>{productPackage.name.ka}</Text>
        {/* time  */}
        <Text>{productPackage.averageDurationMinutes} წთ</Text>
        {/*  TODO show modal */}
        <Text>რას მოიცავს სერვისი?</Text>
      </View>

      <View>
        {/*  Price */}
        <Text>
          {/*TODO*/}
        </Text>
        <Pressable onPress={() => onPressed(productPackage.id)}>
          <Text>არჩევა</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
