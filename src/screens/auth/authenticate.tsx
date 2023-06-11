import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useAuth} from '../../context/auth-context';
import {useForm} from 'react-hook-form';
import FormInput from '../../components/form/form-input';
import {useAuthorize, useSendOtp} from '../../graphql/operations';
import FormButton from '../../components/form/form-button';
import {AuthStackScreenProps} from '../../navigation/types';

interface FormData {
  code: string;
}

const AuthenticateScreen = ({
  route,
  navigation,
}: AuthStackScreenProps<'authenticate'>) => {
  const {control, handleSubmit, setError} = useForm<FormData>({
    defaultValues: {code: ''},
  });

  const {phone, isRegistered} = route.params;

  console.log('phone -> ', phone, isRegistered);

  const {updateAuthToken} = useAuth();

  const [authenticate, {loading, error}] = useAuthorize({
    fetchPolicy: 'no-cache',
  });

  if (error) {
    setError('code', error);
  }

  const [sendOtp, {loading: isOtpLoading}] = useSendOtp({
    fetchPolicy: 'network-only',
  });

  const onConfirm = async (formData: FormData) => {
    console.log('confirm:', formData);
    if (typeof phone !== 'string') {
      console.warn('phone is not string', phone);
      return;
    }

    try {
      const {data, errors} = await authenticate({
        variables: {
          input: {
            phone,
            otp: formData.code,
          },
        },
      });
      console.log('Authenticate resp: ', JSON.stringify({data, errors}));

      if (errors) {
        setError('code', new Error('დაფიქსირდა შეცდომა'));
        return;
      }

      if (!data?.authorize.accessToken) {
        console.warn('auth token is null');
        setError('code', new Error('დაფიქსორდა შეცდომა'));
        return;
      }
      console.log('updateAuthToken');
      await updateAuthToken(data?.authorize.accessToken);
      // TODO save refresh token
      console.log('is registered', isRegistered);
      if (isRegistered) {
        navigation.navigate('drawer', {
          screen: 'tabs',
          params: {
            screen: 'home',
          },
        });
      } else {
        navigation.navigate('customerInfo');
      }
    } catch (e) {
      setError('code', new Error('დაფიქსორდა შეცდომა'));
    }
  };

  const onResend = async () => {
    if (typeof phone !== 'string') {
      console.warn('phone is not string', phone);
      return;
    }

    try {
      const {data, errors} = await sendOtp({variables: {phone: phone}});
      if (data?.sendOtp) {
        Alert.alert('Success', 'ახალი კოდი გამოგზავნიალია თქვენს ნომერზე');
      } else {
        console.warn('code has not been sent');
      }
    } catch (e) {
      setError('code', e as Error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>დაადასტურე მობილურის ნომერი</Text>

      <FormInput
        name="code"
        control={control}
        placeholder="SMS კოდი"
        rules={{
          required: 'კოდი აუცილებელია',
        }}
      />
      <FormButton
        text={'დადასტურება'}
        onPress={handleSubmit(onConfirm)}
        loading={loading}
        disabled={loading}
        loadingText={'ვამოწმებთ...'}
      />

      <FormButton text="ახლიდან გაგზავნა" onPress={onResend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  label: {
    fontSize: 24,
    marginVertical: 5,
    color: 'gray',
  },
  error: {
    marginVertical: 5,
    color: 'red',
  },
});

export default AuthenticateScreen;
