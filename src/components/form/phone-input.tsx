import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller, FieldValues} from 'react-hook-form';
import Colors from '../../styles/colors';
import {useTheme} from '@react-navigation/native';
import {CustomInputProps} from './types';

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
    message: 'ნომრის შეყვანა შეიძლება მხოლოდ ქართული ნომრებით',
  },
};

function PhoneInput<T extends FieldValues>({
  control,
  name,
  placeholder,
  secureTextEntry,
}: CustomInputProps<T>) {
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
              value={'+995'}
              style={{...styles.countryCode, color: theme.colors.text}}
            />
            <TextInput
              value={value}
              onChangeText={onChange}
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
              {error.message || 'შეცდომა'}
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
    padding: 10,
    fontSize: 18,
    marginVertical: 5,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#f8f8f8',
    fontFamily: 'helv-55',
  },
  phoneInput: {
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
