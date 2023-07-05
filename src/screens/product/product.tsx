import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ProductDetails, useGetProduct} from '../../graphql/operations';
import {PackageCard} from '../../components/ProductPackage/package-car';
import Colors from '../../styles/colors';
import {RootStackScreenProps} from '../../navigation/types';
import GoBack from '../../components/go-back';

export default function ProductScreen({
  route,
}: RootStackScreenProps<'product'>) {
  const {params} = route;

  const {data, loading, error} = useGetProduct({
    variables: {
      productId: params.productId,
    },
  });

  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null,
  );

  if (loading || !data) {
    return null;
  }
  const product = data.getProduct;
  console.log(JSON.stringify(product));
  const selectedPackage = product.packages?.find(
    productPackage => productPackage.id === selectedPackageId,
  );

  function selectPackage(packageId: string) {
    setSelectedPackageId(packageId);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.scrollContainer}>
          <GoBack />
          <View>
            {/* Product images */}
            <Image style={styles.image} source={{uri: product?.mainImage}} />
          </View>

          <View>
            {/* Product title */}
            <Text style={styles.title}>{product?.name.ka}</Text>
            {/* Provider logo */}
            <Text>{product?.provider.name}</Text>
            {product?.provider.logo && (
              <Image
                style={styles.providerLogo}
                source={{uri: product?.provider.logo}}
              />
            )}
          </View>

          {/* Location info */}
          <View>
            <Text>
              {product?.location?.address.street},{' '}
              {product?.location?.address.district}
            </Text>
            {/* Distance  */}
          </View>

          <View>
            {/* Available packages */}
            {product.packages?.map((productPackage: ProductDetails) => (
              <PackageCard
                key={productPackage.id}
                productPackage={productPackage}
                onPressed={selectPackage}
                isSelected={productPackage.id === selectedPackageId}
              />
            ))}
          </View>

          {/* ABOUT - descriotion */}
          <View>
            <Text>{product?.description?.ka}</Text>
          </View>

          {/* Product reviews */}
        </View>
        {/* Checkout Button */}
      </ScrollView>
      {selectedPackage && selectedPackage.pricesForCarTypes && (
        <View style={styles.checkoutContainer}>
          <Text style={styles.priceText}>
            {selectedPackage.pricesForCarTypes[0]?.price} GEL
          </Text>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  providerLogo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
