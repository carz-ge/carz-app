import React, {useCallback, useEffect, useState} from 'react';
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
import {useAuth} from '../../context/auth-context';
import {useAuthorize, useSendOtp} from '../../graphql/operations';
import {AuthStackScreenProps} from '../../navigation/types';
import {OtpInput} from '../../components/otp-input/OtpInput';
import {Logo} from '../../assets/SVG';
import colors from '../../styles/colors';
import GoBack from '../../components/go-back';

const OTP_CODE_LENGTH = 6;

function AuthenticateScreen({
  route,
  navigation,
}: AuthStackScreenProps<'authenticate'>) {
  const {phone, isRegistered} = route.params;
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  console.log('phone -> ', phone, isRegistered);

  const {updateAuthToken} = useAuth();

  const [authenticate, {loading, error: authenticationError}] = useAuthorize({
    fetchPolicy: 'no-cache',
  });

  const [sendOtp, {loading: isOtpLoading}] = useSendOtp({
    fetchPolicy: 'network-only',
  });

  // TODO: need to handle and show error
  const onConfirm = useCallback(async () => {
    if (code.length !== OTP_CODE_LENGTH) {
      console.warn('phone is not string', phone);
      return;
    }
    setError(null);

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
        setError('დაფიქსირდა შეცდომა');
        return;
      }

      if (!data?.authorize.accessToken) {
        console.warn('auth token is null');
        setError('დაფიქსორდა შეცდომა');
        return;
      }
      console.log('updateAuthToken');
      await updateAuthToken(data?.authorize.accessToken);
      // TODO save refresh token
      console.log('is registered', isRegistered);
      if (isRegistered) {
        navigation.navigate('mainTabs', {
          screen: 'mainTabs',
        });
      } else {
        navigation.navigate('customerInfo');
      }
    } catch (e) {
      setError('დაფიქსორდა შეცდომა');
    }
  }, [authenticate, code, isRegistered, navigation, phone, updateAuthToken]);

  useEffect(() => {
    if (code.length !== OTP_CODE_LENGTH) {
      return;
    }
    onConfirm().catch(console.warn);
  }, [code, onConfirm]);

  const onResend = async () => {
    setError(null);
    try {
      const {data, errors} = await sendOtp({variables: {phone: phone}});
      if (data?.sendOtp) {
        Alert.alert('Success', 'ახალი კოდი გამოგზავნიალია თქვენს ნომერზე');
      } else {
        console.warn('code has not been sent');
      }
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <>
      <GoBack />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1}}>
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            style={{paddingHorizontal: 25}}>
            <View style={styles.logo}>
              <Logo />
            </View>
            <Text style={[styles.label, {marginBottom: 20}]}>
              დაადასტურე მობილურის ნომერი
            </Text>
            <OtpInput
              numberOfDigits={OTP_CODE_LENGTH}
              focusColor={colors.primary}
              onTextChange={text => setCode(text)}
              theme={{
                pinCodeContainerStyle: error
                  ? {borderColor: colors.inputError}
                  : {},
              }}
              // containerStyle={styles.container}
              // inputsContainerStyle={styles.inputsContainer}
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
            <Pressable
              onPress={onResend}
              disabled={loading}
              style={[styles.button, {backgroundColor: colors.gray}]}>
              <Text style={styles.buttonText}>{'ახლიდან გაგზავნა'}</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
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
