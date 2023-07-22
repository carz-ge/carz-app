import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Controller} from 'react-hook-form';
import {useTheme} from '@react-navigation/native';
import Colors from '../../styles/colors';
import {CustomInputProps} from './types';
import {FormInputValueType} from './form-input';

export interface PhoneFormData extends FormInputValueType {
  phone: string;
}

const rules = {
  required: 'ნომერი აუცილებელია პლათფორმაზე შესასვლელად',
  maxLength: {
    value: 9,
    message: 'ნომერში უნდა იყოს მხოლოდ 9 ციფრი',
  },
  minLength: {
    value: 9,
    message: 'ნომერში უნდა იყოს მხოლოდ 9 ციფრი',
  },
  pattern: {
    value: /^5\d+$/,
    message: 'ნომერი უნდა იწყებოდეს 5-ით',
  },
};

function formatPhoneInput(phone: string) {
  if (phone.length < 4) {
    return phone;
  }
  if (phone.length < 7) {
    return [phone.slice(0, 3), ' ', phone.slice(3)].join('');
  }
  return [phone.slice(0, 3), ' ', phone.slice(3, 6), ' ', phone.slice(6)].join(
    '',
  );
}

function PhoneInput({
  control,
  name,
  placeholder,
  secureTextEntry,
}: CustomInputProps<PhoneFormData>) {
  const theme = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {borderColor: error ? Colors.inputError : Colors.buttonPrimary},
            ]}>
            <TextInput
              value="+995"
              style={{...styles.countryCode, color: theme.colors.text}}
            />
            <TextInput
              value={formatPhoneInput(value as string)} // TODO: fix this
              onChangeText={text =>
                onChange(text.replaceAll(' ', '').slice(0, 9))
              }
              onBlur={onBlur}
              placeholder={placeholder}
              keyboardType="numeric"
              style={{...styles.phoneInput, color: theme.colors.text}}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text
              style={{
                color: Colors.inputError,
                marginVertical: 5,
                alignSelf: 'stretch',
              }}>
              {error.message ?? 'შეცდომა'}
            </Text>
          )}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  countryCode: {
    borderColor: Colors.black,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    marginVertical: 5,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#f8f8f8',
    fontFamily: 'helv-55',
  },
  phoneInput: {
    borderColor: Colors.black,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#f8f8f8',
    flex: 1,
    padding: 10,
    fontSize: 18,
    marginVertical: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 60,
  },
});

export default PhoneInput;
