import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {useAuth} from '../../context/auth-context';
import {useAuthorize, useSendOtp} from '../../graphql/operations';
import FormButton from '../../components/form/form-button';
import {AuthStackScreenProps} from '../../navigation/types';
import {OtpInput} from '../../components/otp-input/OtpInput';
import {LightTheme} from '../../styles/themes';
import {Logo} from '../../assets/SVG';
import colors from '../../styles/colors';
interface FormData {
  code: string;
}
const OTP_CODE_LENGTH = 6;

function AuthenticateScreen({
  route,
  navigation,
}: AuthStackScreenProps<'authenticate'>) {
  const {control, handleSubmit, setError} = useForm<FormData>({
    defaultValues: {code: ''},
  });

  const {phone, isRegistered} = route.params;
  const [code, setCode] = useState('');

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

  // TODO: need to handle and show error
  const onConfirm = async () => {
    if (typeof phone !== 'string' || code.length !== OTP_CODE_LENGTH) {
      console.warn('phone is not string', phone);
      return;
    }

    try {
      const {data, errors} = await authenticate({
        variables: {
          input: {
            phone,
            otp: code,
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset=""
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}
        automaticallyAdjustKeyboardInsets={true}>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          style={{paddingHorizontal: 25}}>
          <View style={styles.logo}>
            <Logo />
          </View>
          <Text style={styles.label}>დაადასტურე მობილურის ნომერი</Text>
          <OtpInput
            numberOfDigits={OTP_CODE_LENGTH}
            focusColor="green"
            onTextChange={text => setCode(text)}
            // containerStyle={styles.container}
            // inputsContainerStyle={styles.inputsContainer}
            // pinCodeContainerStyle={styles.pinCodeContainer}
            // pinCodeTextStyle={styles.pinCodeText}
            // focusStickStyle={styles.focusStick}
            focusStickBlinkingDuration={500}
          />
          <Pressable
            onPress={onConfirm}
            disabled={loading && code.length !== OTP_CODE_LENGTH}
            style={[styles.button, {backgroundColor: colors.primary}]}>
            <Text style={styles.buttonText}>
              {loading ? 'ვამოწმებთ...' : 'დადასტურება'}
            </Text>
          </Pressable>
          <FormButton text="ახლიდან გაგზავნა" onPress={onResend} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: colors.gray,
    width: '100%',
    fontFamily: 'helv-65',
  },
  logo: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginTop: 80,
    marginBottom: 50,
  },
  button: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 5,
    marginTop: 25,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'helv-65',
  },
});

export default AuthenticateScreen;
