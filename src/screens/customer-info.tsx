import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FieldValues, useForm} from 'react-hook-form';
import FormInput from '../components/form/form-input';
import {Language, useUpdateUser} from '../graphql/operations';
import FormButton from '../components/form/form-button';
import {RootStackScreenProps} from '../navigation/types';
import {Logo} from '../assets/SVG';
import {LightTheme} from '../styles/themes';

interface FormData extends FieldValues {
  firstname: string;
  lastname: string;
}

const CustomerInfo = ({navigation}: RootStackScreenProps<'customerInfo'>) => {
  const [updateUser, {loading, error}] = useUpdateUser({
    fetchPolicy: 'network-only',
  });

  const {control, handleSubmit} = useForm<FormData>({
    defaultValues: {
      firstname: '',
      lastname: '',
    },
  });

  const onUpdateUser = async (formData: FormData) => {
    console.log('on Update User: ', formData);
    try {
      const {data, errors} = await updateUser({
        variables: {
          input: {...formData, language: Language.Ka},
        },
      });

      if (errors) {
        console.warn('errors : ', errors);
        return;
      }

      if (!data) {
        console.warn('data is empty : ');
        return;
      }
      navigation.navigate('drawer', {
        screen: 'tabs',
        params: {
          screen: 'home',
        },
      });
    } catch (e) {
      console.warn(e);
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
          <Text style={styles.label}>შეიყვანე მონაცემები</Text>

          <FormInput
            control={control}
            name={'firstname'}
            placeholder={'სახელი'}
            rules={{
              required: 'შეავსე სახელი',
            }}
          />
          <FormInput
            control={control}
            name={'lastname'}
            placeholder={'გვარი'}
            rules={{
              required: 'შეავსე გვარი',
            }}
          />

          <FormButton
            text={'შემდეგი'}
            onPress={handleSubmit(onUpdateUser)}
            loading={loading}
            disabled={loading}
            loadingText={'ნახლდება...'}
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
    marginBottom: 15,
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

export default CustomerInfo;
