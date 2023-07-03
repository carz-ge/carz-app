import React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FieldValues, useForm} from 'react-hook-form';
import {useSendOtp} from '../../graphql/operations';
import PhoneInput from '../../components/form/phone-input';
import FormButton from '../../components/form/form-button';
import {AuthStackScreenProps} from '../../navigation/types';
import {Logo} from '../../assets/SVG';
import {LightTheme} from '../../styles/themes';
import {StatusBar} from 'react-native';

interface FormData extends FieldValues {
  phone: string;
}

const SignIn = ({navigation}: AuthStackScreenProps<'signIn'>) => {
  const [sendOtp, {loading: isOtpLoading}] = useSendOtp({
    fetchPolicy: 'network-only',
  });

  const {control, handleSubmit} = useForm<FormData>({
    defaultValues: {
      phone: '',
    },
  });

  const onSignIn = async (formData: FormData) => {
    console.log('Sign in: ', formData);
    try {
      const phone = `+995${formData.phone}`;
      const {data, errors} = await sendOtp({variables: {phone}});

      if (errors) {
        console.warn('errors : ', errors);
        return;
      }

      if (!data) {
        console.warn('data is empty : ');
        return;
      }

      if (!data.sendOtp.sent) {
        console.warn('SMS was not sent ');
        return;
      }

      navigation.push('auth', {
        screen: 'authenticate',
        params: {
          phone,
          isRegistered: data.sendOtp.isRegistered,
          expiresAt: data.sendOtp.expiresAt,
        },
      });
    } catch (e) {
      console.warn(e);
      Alert.alert('შეცდომა');
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
          <Text style={styles.label}>შეიყვანე მობილურის ნომერი</Text>

          <PhoneInput
            control={control}
            name={'phone'}
            placeholder={'512345678'}
          />

          <FormButton
            text={'კოდის გაგზავნა'}
            onPress={handleSubmit(onSignIn)}
            loading={isOtpLoading}
            disabled={isOtpLoading}
            loadingText={'ვამოწმებთ...'}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: LightTheme.colors.gray,
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
});

export default SignIn;
