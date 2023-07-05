import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core/src/types';
import {Product} from '../../graphql/operations';
import Colors from '../../styles/colors';
import {RootStackParamList} from '../../navigation/types';
import {getMinProductPriceInGel} from '../../utils/price';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

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

          {distance && (
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
              }}>
              <Image
                style={{width: 20, height: 20, gap: 5}}
                source={
                  require('../../../assets/images/distance.png') as ImageSourcePropType
                }
                resizeMode="contain"
              />
              <Text>{distance}</Text>
              {/* address */}
              {/*<Text style={{color: Colors.primary}}>*/}
              {/*  {product.location?.address.district}*/}
              {/*</Text>*/}
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
            }}>
            {/* minimum price */}
            <Image
              style={{width: 20, height: 20}}
              source={
                require('../../../assets/images/gel.png') as ImageSourcePropType
              }
              resizeMode="contain"
            />
            <Text style={{color: Colors.primary}}>{priceInGel} ლარიდან</Text>

            {/* book now button */}
          </View>
          {/* Type & Description */}
          <Text style={styles.description} numberOfLines={2}>
            {product.description?.ka}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    padding: 5,

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
    margin: 10,
    color: Colors.primary,
    flexDirection: 'row',
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
