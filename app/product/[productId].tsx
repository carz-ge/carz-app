import React, {useState} from 'react';
import {Text, StyleSheet, View, Image, ScrollView} from 'react-native';
import {useSearchParams} from 'expo-router';
import {ProductDetails, useGetProduct} from '../../graphql/operations';
import {PackageCard} from '../../components/ProductPackage/package-car';

export default function ProductId() {
  const params = useSearchParams();

  const {data, loading, error} = useGetProduct({
    variables: {
      productId: params.productId as string,
    },
  });

  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null,
  );

  if (loading || !data) {
    return <></>;
  }
  const product = data.getProduct;
  console.log(JSON.stringify(product));

  function selectPackage(packageId: string) {
    setSelectedPackageId(packageId);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          {/* product images*/}
          <Image style={styles.image} source={{uri: product?.mainImage}} />
        </View>

        <View>
          {/* Product title*/}
          <Text style={styles.title}>{product?.name.ka}</Text>
          {/* provider logo */}
          <Text>{product?.provider.name}</Text>
          {product?.provider.logo && (
            <Image
              style={styles.providerLogo}
              source={{uri: product?.provider.logo}}
            />
          )}
        </View>

        {/* location info */}
        <View>
          <Text>
            {product?.location?.address.street},{' '}
            {product?.location?.address.district}
          </Text>
          {/* distance  */}
        </View>

        <View>
          {/* available packages */}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 90,
    height: 100,
  },
  providerLogo: {
    width: 90,
    height: 100,
  },
});
