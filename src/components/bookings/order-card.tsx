import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Image} from 'expo-image';
import {Order, OrderStatus} from '../../graphql/operations';
import colors from '../../styles/colors';
import React from 'react';
import {convertPriceIntoGel} from '../../utils/price';

import {getCalendars, getLocales} from 'expo-localization';

import {format} from 'date-fns';
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

const orderStatusMap: Record<OrderStatus, {color: string; name: string}> = {
  [OrderStatus.Active]: {
    color: 'green',
    name: 'დაჯავშნილია',
  },
  [OrderStatus.CancelledByManager]: {
    color: 'red',
    name: 'უარყოფილია მენეჯერის მიერ',
  },
  [OrderStatus.WaitingManager]: {
    color: 'blue',
    name: 'ველოდებით მენეჯერს',
  },
  [OrderStatus.Failed]: {
    color: 'red',
    name: 'წარუმატებელი',
  },
  [OrderStatus.Rejected]: {
    color: 'red',
    name: 'უარყოგილია',
  },
  [OrderStatus.Processing]: {
    color: 'blue',
    name: 'მუშავდება',
  },
  [OrderStatus.Cancelled]: {
    color: 'yellow',
    name: 'გაუქმებულია',
  },
  [OrderStatus.Reimbursed]: {
    color: 'yellow',
    name: 'თანხა დაბრუნებულია',
  },
  [OrderStatus.New]: {
    color: 'blue',
    name: 'ახალი',
  },
  [OrderStatus.Payed]: {
    color: 'blue',
    name: 'მუშავდება',
  },
};

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
        <View style={{padding: 10, maxWidth: 200}}>
          <View>
            <Text style={{fontWeight: 'bold'}}>{order.product.name.ka}</Text>
            <Text>{order.productPackage.name.ka}</Text>
            {order.product.location && (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text>
                  {order.product.location.address.street},{' '}
                  {order.product.location.address.district},{' '}
                  {order.product.location.address.city}
                </Text>
                {/*<Ionicons size={20} name="location" />*/}
              </View>
            )}
          </View>
          <View style={{marginTop: 10}}>
            <Text>მანქანა: {order.carPlateNumber}</Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}>
              <Text>
                დრო:{' '}
                {format(Date.parse(`${order.schedulingDate!}`), 'd MMMM', {
                  locale: ka,
                  weekStartsOn: 0,
                })}
              </Text>
              {/*<Ionicons size={20} name="calendar" />*/}
            </View>
            <Text>
              სერვისის ფასი:{' '}
              {convertPriceIntoGel(order.totalPrice - order.commission)} ₾
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-end', justifyContent: 'space-between'}}>
          <Image
            style={{width: 50, height: 50, borderRadius: 25}}
            source={{uri: order.product.mainImage}}
          />
          {order.status && (
            <View
              style={{
                maxWidth: 150,
                marginTop: 5,
                padding: 5,
                borderRadius: 15,
                backgroundColor: orderStatusMap[order.status].color,
              }}>
              <Text style={{color: colors.white}}>
                {orderStatusMap[order.status].name}
              </Text>
            </View>
          )}
        </View>
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
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.grayLight,
    justifyContent: 'space-between',
    flexDirection: 'row',
    // alignItems: 'center',
    marginVertical: 5,
  },
});
