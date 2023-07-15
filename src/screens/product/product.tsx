import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Location from 'expo-location';
import {Ionicons} from '@expo/vector-icons';
import {useGetProduct} from '../../graphql/operations';
import Colors from '../../styles/colors';
import colors from '../../styles/colors';
import {RootStackScreenProps} from '../../navigation/types';
import GoBack from '../../components/go-back';
import ProductPhotos from '../../components/product/product-photos';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import {calculateDistance} from '../../utils/map-distance';
import {getPriceRangeForPackage} from '../../utils/price';
import ProductMapView from '../../components/product/product-map-view';
import AvailablePackages from '../../components/product/available-packages';
import CustomActivityIndicator from '../../components/activity-indicator/custom-activity-indicator';

export default function ProductScreen({
  route,
  navigation,
}: RootStackScreenProps<'product'>) {
  const {params} = route;
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  const {data, loading, error} = useGetProduct({
    variables: {
      productId: params.productId,
    },
  });

  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null,
  );
  useEffect(() => {
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const locationPosition = await Location.getCurrentPositionAsync({});
      setLocation(locationPosition);
    })();
  }, []);
  if (loading || !data) {
    return <CustomActivityIndicator />;
  }
  const product = data.getProduct;
  console.log(JSON.stringify(product));
  const selectedPackage = product.packages?.find(
    productPackage => productPackage.id === selectedPackageId,
  );

  function selectPackage(packageId: string | null) {
    setSelectedPackageId(packageId);
  }

  function onCheckoutPressed() {
    if (!selectedPackageId) {
      return;
    }
    navigation.navigate('checkout', {
      productId: params.productId,
      packageId: selectedPackageId,
    });
  }

  const distance = calculateDistance(location, product.location?.coordinates);

  return (
    <SafeAreaView style={styles.container}>
      <GoBack />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Product images */}
        <ProductPhotos
          images={[product.mainImage, ...(product.images || [])]}
        />
        <View style={styles.infoContainer}>
          <View style={styles.details}>
            <View
              style={{
                flex: 1,
              }}>
              {/* Product title */}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={styles.title}>{product.name.ka}</Text>
                  <View style={styles.shortDetails}>
                    {/* Provider logo */}
                    <Text>
                      by{' '}
                      <Text style={styles.providerName}>
                        {product?.provider.name}
                      </Text>
                    </Text>
                  </View>
                </View>
                {product.mainImage && (
                  <Image
                    style={styles.providerLogo}
                    source={{uri: product.mainImage}}
                  />
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Ionicons size={20} name="star" />
                <Text> 4.6 (100)</Text>
              </View>
              {/* Location info */}
              {product.location && (
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Ionicons size={20} name="location" />
                  <Text>
                    {product.location.address.street},{' '}
                    {product.location.address.district},{' '}
                    {product.location.address.city}
                  </Text>
                </View>
              )}

              {/* Distance  */}
              {distance && (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 1,
                  }}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={
                      require('../../../assets/images/distance.png') as ImageSourcePropType
                    }
                    resizeMode="contain"
                  />
                  <Text>{distance} - შენი ადგილმდებარეობიდან</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.sectionsContainer}>
            <View>
              <Text style={styles.sectionsTitle}>აღწერა</Text>
              <Text>{product.description?.ka}</Text>
            </View>
            <View>
              <Text style={styles.sectionsTitle}>პაკეტები</Text>
              {/* Available packages */}
              <AvailablePackages
                packages={product.packages || []}
                selectPackage={selectPackage}
                selectedPackageId={selectedPackageId}
              />
            </View>
            <View>
              <Text style={styles.sectionsTitle}>ლოკაცია</Text>
              <ProductMapView
                name={product.name.ka}
                lat={product.location?.coordinates.lat || 0}
                lng={product.location?.coordinates.lng || 0}
              />
            </View>
            <View>
              <Text style={styles.sectionsTitle}>შეფასებები</Text>
              <Text>სამრეცხაოს ჯერ არ აქვს შეფასება</Text>
            </View>
          </View>
          {/* Product reviews */}
        </View>
        {/* Checkout Button */}
      </ScrollView>
      {selectedPackage && selectedPackage.pricesForCarTypes && (
        <View style={styles.checkoutContainer}>
          <View>
            <Text style={styles.priceText}>
              {getPriceRangeForPackage(selectedPackage.pricesForCarTypes || [])}{' '}
              GEL
            </Text>
            <Text>{selectedPackage.name.ka}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={onCheckoutPressed}>
            <Text style={styles.checkoutButtonText}>შემდეგი</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  scrollContainer: {},
  title: {
    maxWidth: '90%',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    padding: 10,
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  providerLogo: {
    width: 50,
    height: 50,
    // marginRight: 100,
    borderRadius: 25,
  },
  providerName: {
    textDecorationLine: 'underline',
  },
  shortDetails: {
    gap: 2,
    paddingVertical: 10,
  },
  sectionsContainer: {
    gap: 10,
  },
  sectionsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  checkoutContainer: {
    position: 'absolute',
    bottom: 1,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 100,
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
