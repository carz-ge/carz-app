import {StyleSheet, Text, View, Image} from 'react-native';
import {Order} from '../../graphql/operations';
import colors from '../../styles/colors';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {convertPriceIntoGel} from '../../utils/price';
interface OrderCardProps {
  order: Order;
}
export default function OrderCard({order}: OrderCardProps) {
  return (
    <View>
      <View style={styles.detailsContainer}>
        <Text>{order.productPackage.name.ka}</Text>
        <Text>{order.product.name.ka}</Text>
        <Text>{order.product.category.name.ka}</Text>
        <Text>{order.product.provider.name}</Text>
        <Text>{order.status}</Text>
        <Text>{order.schedulingDate}</Text>
        <Text>{order.schedulingTime}</Text>
        <Text>{order.carType}</Text>
        <Text>{order.carPlateNumber}</Text>
        <Text>{order.createdAt}</Text>
        <Text>{order.updatedAt}</Text>
        <Text>{order.errorMessage}</Text>
        {order.product.location && (
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Ionicons size={20} name="location" />
            <Text>
              {order.product.location.address.street},{' '}
              {order.product.location.address.district},{' '}
              {order.product.location.address.city}
            </Text>
          </View>
        )}
        <Text>{convertPriceIntoGel(order.commission)}</Text>
        <Text>{convertPriceIntoGel(order.totalPrice)}</Text>

        <Image
          style={{width: 100, height: 100}}
          source={{uri: order.product.mainImage}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  detailsContainer: {
    padding: 20,
    gap: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.grayLight,
    justifyContent: 'center',
    marginVertical: 10,
  },
});
