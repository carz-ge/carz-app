import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
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
  useGetCommission,
  useGetProduct,
  useListCards,
} from '../../graphql/operations';
import DatePicker from '../../components/date-time-picker/date-picker';
import TimePicker from '../../components/date-time-picker/time-picker';
import {convertPriceIntoGel} from '../../utils/price';
import {FetchResult} from '@apollo/client';
import CarTypePickerV2 from '../../components/date-time-picker/car-type-picker-2';
import {useAppSelector} from '../../store/hooks';
import {
  selectCarType,
  selectDate,
  selectTime,
} from '../../store/slice/searchSlice';
import CardPicker from '../../components/card/card-picker';
import CustomActivityIndicator from '../../components/activity-indicator/custom-activity-indicator';

function extractPriceFromCarType(
  pricesForCarTypes: {carType: CarType; price: number | null}[],
  carType: CarType,
) {
  const res = pricesForCarTypes.find(cp => cp.carType === carType);
  return res?.price || null;
}

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
  const {
    data: commissionData,
    loading: commissionLoading,
    error: commissionError,
  } = useGetCommission({
    variables: {
      productId,
      packageId,
    },
  });

  const {
    data: cardsData,
    loading: cardsLoading,
    error: cardsError,
  } = useListCards();

  const commission = commissionData?.getCommission.commissionToShow || null;

  const [createOrder, {loading: createOrderLoading, error: createOrderError}] =
    useCreateOrder({
      fetchPolicy: 'network-only',
    });

  const idempotencyKey = Crypto.randomUUID();
  const [selectedDate, setSelectedDate] = useState<string | null>(
    useAppSelector(selectDate),
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(
    useAppSelector(selectTime),
  );
  const [selectedCarType, setSelectedCarType] = useState<CarType | null>(
    useAppSelector(selectCarType),
  );
  const [plateNumber, setPlateNumber] = useState<string>('');
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  if (loading || !data || createOrderLoading) {
    return <CustomActivityIndicator />;
  }
  const product = data.getProduct;

  const selectedPackage = product.packages?.find(
    productPackage => productPackage.id === packageId,
  );

  async function onCheckoutPressed() {
    const orderResponse: FetchResult<CreateOrder> = await createOrder({
      variables: {
        order: {
          idempotencyKey: idempotencyKey,
          productId,
          packageId,
          schedulingDate: selectedDate,
          schedulingTime: selectedTime,
          carType: selectedCarType,
          carPlateNumber: plateNumber,
          carId: null,
          comment: '',
          cardId: selectedCardId,
        },
      },
    });
    // TODO if there is no data show error
    console.log('orderResponse', JSON.stringify(orderResponse));
    if (orderResponse.errors && orderResponse.errors.length > 0) {
      return;
    }

    if (orderResponse.data?.createOrder.isAutomatic) {
      // TODO we dont now if payment was successful or not
      navigation.navigate('paymentStatus', {
        success: true,
        orderId: orderResponse.data?.createOrder.id || '',
      });

      return;
    }

    navigation.navigate('payment', {
      redirectUrl: orderResponse.data?.createOrder.redirectLink || '',
      orderId: orderResponse.data?.createOrder.id || '',
    });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <GoBack />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.label}>Checkout</Text>
          </View>
          <View style={{paddingHorizontal: 10}}>
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
            <CarTypePickerV2
              pricesForCarTypes={selectedPackage?.pricesForCarTypes || []}
              carType={selectedCarType}
              setCarType={carType => {
                setSelectedCarType(carType);
              }}
            />
            <CardPicker
              cards={cardsData?.listCards || []}
              cardId={selectedCardId}
              setCardId={cardId => {
                setSelectedCardId(cardId);
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
                <Text style={styles.label}>
                  {selectedPackage?.name.ka || ''}
                </Text>
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
              {selectedCarType && (
                <View style={styles.detailNameAndText}>
                  <Text style={styles.label}>სერვისის ფასი ადგილზე:</Text>
                  <Text style={styles.label}>
                    {convertPriceIntoGel(
                      extractPriceFromCarType(
                        selectedPackage?.pricesForCarTypes || [],
                        selectedCarType,
                      ) || 0,
                    )}{' '}
                    ლარი
                  </Text>
                </View>
              )}
              {commission && (
                <View style={styles.detailNameAndText}>
                  <Text style={styles.label}>ჯავშნის საკომისიო:</Text>
                  <Text style={styles.label}>{commission} ლარი</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {selectedPackage && selectedPackage.pricesForCarTypes && (
        <View style={styles.checkoutContainer}>
          <View>
            <Text style={styles.priceText}>{commission} GEL</Text>
            <Text>{selectedPackage.name.ka}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={onCheckoutPressed}>
            <Text style={styles.checkoutButtonText}>გადახდა</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
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
    marginBottom: 70,
  },
  detailNameAndText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    backgroundColor: colors.primary,
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
