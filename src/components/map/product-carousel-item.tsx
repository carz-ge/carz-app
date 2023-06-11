import React from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import {Product} from '../../graphql/operations';
import Colors from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';
import {NavigationProp} from '@react-navigation/core/src/types';

interface ProductCarouselItemProps {
  product: Product;
  cardWidth: number;
}

const ProductCarouselItem = ({
  product,
  cardWidth,
}: ProductCarouselItemProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const goToPostPage = () => {
    navigation.navigate('product', {productId: product.id});
  };

  return (
    <Pressable
      onPress={goToPostPage}
      style={[styles.container, {width: cardWidth}]}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} source={{uri: product.mainImage}} />

        <View style={{flex: 1, marginHorizontal: 10}}>
          {/* Type & Description */}
          <Text style={styles.description} numberOfLines={2}>
            {product.description?.ka}
          </Text>

          <Text style={styles.name}>{product.name.ka}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCarouselItem;

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
