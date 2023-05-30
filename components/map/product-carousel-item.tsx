import React from 'react';
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
  StyleSheet,
} from 'react-native';
import {Product} from '../../graphql/operations';
import {useRouter} from 'expo-router';

interface ProductCarouselItemProps {
  product: Product;
}

const ProductCarouselItem = ({product}: ProductCarouselItemProps) => {
  const width = useWindowDimensions().width;

  const router = useRouter();

  const goToPostPage = () => {
    router.replace(`/product/${product.id}`);
  };

  return (
    <Pressable
      onPress={goToPostPage}
      style={[styles.container, {width: width - 60}]}>
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
    color: '#5df33b',
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
