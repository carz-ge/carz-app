import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import * as Crypto from 'expo-crypto';
import colors from '../../styles/colors';
import GoBack from '../../components/go-back';
import {RootStackScreenProps} from '../../navigation/types';
import {
  CarType,
  CreateOrder,
  useCreateOrder,
  useGetProduct,
} from '../../graphql/operations';
import DatePicker from '../../components/date-time-picker/date-picker';
import TimePicker from '../../components/date-time-picker/time-picker';
import CarTypePicker from '../../components/date-time-picker/car-type-picker';
import {getPriceRangeForPackage} from '../../utils/price';
import Colors from '../../styles/colors';
import {FetchResult} from '@apollo/client';

export default function CheckoutScreen({
  route,
  navigation,
}: RootStackScreenProps<'checkout'>) {
  const {
    params: {productId, packageId},
  } = route;
  const {data, loading, error} = useGetProduct({
    variables: {
      productId,
    },
  });

  const [createOrder, {loading: createOrderLoading, error: createOrderError}] =
    useCreateOrder({
      fetchPolicy: 'network-only',
    });

  const idempotencyKey = Crypto.randomUUID();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedCarType, setSelectedCarType] = useState<CarType | null>(null);
  const [plateNumber, setPlateNumber] = useState<string>('');

  if (loading || !data) {
    return <ActivityIndicator />;
  }
  const product = data.getProduct;

  const selectedPackage = product.packages?.find(
    productPackage => productPackage.id === packageId,
  );

  async function onCheckoutPressed() {
    console.log('onCheckoutPressed');
    const orderResponse: FetchResult<CreateOrder> = await createOrder({
      variables: {
        order: {
          idempotencyKey: idempotencyKey,
          productId,
          packageId,
          schedulingDay: selectedDate,
          schedulingTime: selectedTime,
          carType: selectedCarType,
          carPlateNumber: plateNumber,
          carId: null,
          comment: '',
        },
      },
    });
    console.log('orderResponse', JSON.stringify(orderResponse));
    navigation.navigate('payment', {
      redirectUrl: orderResponse.data?.createOrder.redirectLink || '123',
    });
  }
  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      <GoBack />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.label}>Checkout</Text>
          </View>
          <DatePicker
            date={selectedDate}
            setDate={date => {
              setSelectedDate(date);
            }}
          />
          <TimePicker
            time={selectedTime}
            setTime={time => {
              setSelectedTime(time);
            }}
          />
          <CarTypePicker
            carType={selectedCarType}
            setCarType={carType => {
              setSelectedCarType(carType);
            }}
          />
          <View style={styles.plateNumberContainer}>
            <Text style={styles.plateNumberLabel}>მანქანის ნომერი</Text>
            <TextInput
              style={styles.plateNumberStyle}
              value={plateNumber}
              autoCapitalize={'characters'}
              onChangeText={setPlateNumber}
              placeholder={'AA-123-AA'}
            />
          </View>
          <View style={styles.detailsContainer}>
            {/*<Text style={styles.detailHeader}>დეტალები</Text>*/}
            <View style={styles.detailNameAndText}>
              <Text style={styles.label}>სერვისი:</Text>
              <Text style={styles.label}>{product.name.ka}</Text>
            </View>
            <View style={styles.detailNameAndText}>
              <Text style={styles.label}>პაკეტი:</Text>
              <Text style={styles.label}>{selectedPackage?.name.ka || ''}</Text>
            </View>
            {selectedCarType && (
              <View style={styles.detailNameAndText}>
                <Text style={styles.label}>მანქანა:</Text>
                <Text style={styles.label}>{selectedCarType}</Text>
              </View>
            )}
            {plateNumber && (
              <View style={styles.detailNameAndText}>
                <Text style={styles.label}>მანქანის ნომერი:</Text>
                <Text style={styles.label}>{plateNumber}</Text>
              </View>
            )}
            {selectedDate && (
              <View style={styles.detailNameAndText}>
                <Text style={styles.label}>დღე:</Text>
                <Text style={styles.label}>{selectedDate}</Text>
              </View>
            )}
            {selectedTime && (
              <View style={styles.detailNameAndText}>
                <Text style={styles.label}>დრო:</Text>
                <Text style={styles.label}>{selectedTime}</Text>
              </View>
            )}
            <View style={styles.detailNameAndText}>
              <Text style={styles.label}>სერვისის ფასი ადგილზე:</Text>
              <Text style={styles.label}>{100} ლარი</Text>
            </View>
            <View style={styles.detailNameAndText}>
              <Text style={styles.label}>საკომისიო:</Text>
              <Text style={styles.label}>{2} ლარი</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
            <Text style={styles.checkoutButtonText}>გადახდა</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  detailHeader: {
    fontSize: 18,
    color: colors.black,
    fontFamily: 'helv-65',
  },
  label: {
    fontSize: 16,
    color: colors.gray,
    fontFamily: 'helv-65',
  },
  plateNumberContainer: {
    marginVertical: 10,
    gap: 5,
  },
  plateNumberStyle: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    textAlign: 'center',
  },
  plateNumberLabel: {
    fontSize: 18,
    color: colors.black,
    fontFamily: 'helv-65',
  },
  detailsContainer: {
    padding: 20,
    gap: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.grayLight,
    justifyContent: 'center',
  },
  detailNameAndText: {flexDirection: 'row', justifyContent: 'space-between'},
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
