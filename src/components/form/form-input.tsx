import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller, FieldValues} from 'react-hook-form';
import Colors from '../../styles/colors';
import {useTheme} from '@react-navigation/native';
import {CustomInputProps} from './types';

function FormInput<T extends FieldValues>({
  control,
  name,
  placeholder,
  secureTextEntry,
  rules = {},
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
              {borderColor: error ? Colors.inputError : Colors.buttonPrimary},
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={{...styles.input, color: theme.colors.text}}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text
              style={{
                color: Colors.inputError,
                alignSelf: 'stretch',
                fontFamily: 'helv-55',
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
  input: {
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    fontSize: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
});

export default FormInput;
