import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import colors from '../../styles/colors';
import {GestureResponderEvent} from 'react-native/Libraries/Types/CoreEventTypes';

interface CustomButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
  loadingText?: string;
  loading?: boolean;
  disabled?: boolean | null;
}

const FormButton = ({
  onPress,
  text,
  loadingText,
  loading,
  disabled,
}: CustomButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, {backgroundColor: colors.primary}]}>
      <Text style={styles.buttonText}>{loading ? loadingText : text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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

export default FormButton;
