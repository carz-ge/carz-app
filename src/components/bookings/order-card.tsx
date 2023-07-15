import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Order} from '../../graphql/operations';
import colors from '../../styles/colors';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {convertPriceIntoGel} from '../../utils/price';

import {getLocales, getCalendars} from 'expo-localization';

import {format, formatDistance, formatRelative} from 'date-fns';
import {ka} from 'date-fns/locale';

import dayjs from 'dayjs';
import 'dayjs/locale/ka';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import localeData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';

import Moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {MainTabParamList} from '../../navigation/types';
import {NavigationProp} from '@react-navigation/core/src/types';

const locale = getLocales();
const cal = getCalendars();

console.log(locale, cal);
dayjs.extend(updateLocale);
dayjs.locale('ka');
dayjs.apply(localeData);
dayjs.apply(localizedFormat);

Moment.locale('ka');

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({order}: OrderCardProps) {
  const navigation = useNavigation<NavigationProp<MainTabParamList>>();
  const date = Date.parse(order.updatedAt || '');
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('product', {
          productId: order.product.id,
        });
      }}>
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
        <Text>{dayjs(order.createdAt).toString()}</Text>
        <Text>{Moment(order.updatedAt).format('LLLL').toLocaleString()}</Text>
        <Text>
          {formatRelative(date, new Date(), {
            locale: ka,
          })}
        </Text>
        <Text>
          {format(date, 'HH:MM MMMM yyyy', {
            locale: ka,
            weekStartsOn: 0,
          })}
        </Text>
        <Text>
          {formatDistance(date, new Date(), {
            locale: ka,
          })}
        </Text>
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
    </TouchableOpacity>
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
