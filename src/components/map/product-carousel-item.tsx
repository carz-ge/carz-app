import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core/src/types';
import {Product} from '../../graphql/operations';
import Colors from '../../styles/colors';
import {RootStackParamList} from '../../navigation/types';
import {getMinProductPriceInGel} from '../../utils/price';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import {FontAwesome5, Ionicons} from '@expo/vector-icons';
interface ProductCarouselItemProps {
  product: Product;
  cardWidth: number;
  distance: string | null;
}

export default function ProductCarouselItem({
  product,
  cardWidth,
  distance,
}: ProductCarouselItemProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const goToProductPage = () => {
    navigation.navigate('product', {productId: product.id});
  };

  const priceInGel = getMinProductPriceInGel(product);

  return (
    <Pressable
      onPress={goToProductPage}
      style={[styles.container, {width: cardWidth}]}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} source={{uri: product.mainImage}} />

        <View style={{flex: 1, marginHorizontal: 10}}>
          <Text style={styles.name}>{product.name.ka}</Text>

          {/* rating */}
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
            }}>
            {/* minimum price */}
            <FontAwesome5 size={15} name={'money-bill'} />
            <Text style={{color: Colors.gray, marginLeft: 5}}>
              {priceInGel} ლარიდან
            </Text>

            {/* book now button */}
          </View>
          {/* Type & Description */}
          {/*<Text style={styles.description} numberOfLines={2}>*/}
          {/*  {product.description?.ka}*/}
          {/*</Text>*/}
          {product.location && (
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                alignItems: 'center',
                marginTop: 8,
              }}>
              <Ionicons size={20} name="location" />
              <Text style={{marginLeft: 10}}>
                {product.location.address.street},{' '}
                {product.location.address.district}
              </Text>
            </View>
          )}
          {distance && (
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                alignItems: 'center',
                marginTop: 8,
              }}>
              <Image
                style={{width: 20, height: 20, marginRight: 10}}
                source={
                  require('../../../assets/images/distance.png') as ImageSourcePropType
                }
                resizeMode="contain"
              />
              <Text>{distance}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  name: {
    padding: 0,
    paddingRight: 8,
    color: Colors.primary,
    flexDirection: 'row',
    fontFamily: 'helv-65',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 15,
  },

  image: {
    height: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  description: {
    fontSize: 15,
  },
});
