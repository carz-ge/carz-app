import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRouter} from 'expo-router';
import {FieldValues, useForm} from 'react-hook-form';
import {useSendOtp} from '../../graphql/operations';
import PhoneInput from '../../components/form/phone-input';
import FormButton from '../../components/form/form-button';

interface FormData extends FieldValues {
  phone: string;
}

const SignIn = () => {
  const router = useRouter();
  const [sendOtp, {loading: isOtpLoading}] = useSendOtp({
    fetchPolicy: 'network-only',
  });

  const {control, handleSubmit} = useForm<FormData>({
    defaultValues: {
      phone: '',
    },
  });

  const onSignIn = async (formData: FormData) => {
    console.warn('Sign in: ', formData);
    try {
      const phone = `+995${formData.phone}`
      const {data, errors} = await sendOtp({variables: {phone}});

      if (errors) {
        console.warn("errors : ", errors);
        return;
      }

      if (!data) {
        console.warn("data is empty : ");
        return;
      }

      if (!data.sendOtp.sent) {
        console.warn("SMS was not sent ");
        return;
      }

      router.push({
        pathname: '/authenticate',
        params: {
          phone: encodeURIComponent(phone), // need to encode in order to send plus (+) as an parameter
          // phone,
          isRegistered: String(data.sendOtp.isRegistered),
          expiresAt: data.sendOtp.expiresAt}
      });
    } catch (e) {
      console.warn(e);
      Alert.alert('შეცდომა');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>შეიყვანე მობილურის ნომერი</Text>

      <PhoneInput control={control} name={'phone'} placeholder={'512345678'}/>

      <FormButton
        text={'კოდის გაგზავნა'}
        onPress={handleSubmit(onSignIn)}
        loading={isOtpLoading}
        disabled={isOtpLoading}
        loadingText={'ვამოწმებთ...'}
      />
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
});

export default SignIn;
