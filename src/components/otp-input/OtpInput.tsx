import React, {forwardRef, useImperativeHandle} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {VerticalStick} from './VerticalStick';
import {OtpInputProps, OtpInputRef} from './OtpInput.types';
import useOtpInput from './useOtpInput';
import {styles} from './OtpInput.styles';
import colors from '../../styles/colors';

export const OtpInput = forwardRef<OtpInputRef, OtpInputProps>((props, ref) => {
  const {
    models: {text, inputRef, focusedInputIndex},
    actions: {clear, handlePress, handleTextChange},
    forms: {setText},
  } = useOtpInput(props);
  const {
    numberOfDigits,
    focusColor = colors.primary,
    focusStickBlinkingDuration,
    theme = {},
  } = props;
  const {
    containerStyle,
    inputsContainerStyle,
    pinCodeContainerStyle,
    pinCodeTextStyle,
    focusStickStyle,
  } = theme;

  useImperativeHandle(ref, () => ({clear, setValue: setText}));

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputsContainer, inputsContainerStyle]}>
        {Array(numberOfDigits)
          .fill(0)
          .map((_, index) => {
            const char = text[index];
            const isFocusedInput = index === focusedInputIndex;

            return (
              <Pressable
                key={`${char}-${index}`}
                onPress={handlePress}
                style={[
                  styles.codeContainer,
                  focusColor && isFocusedInput ? {borderColor: focusColor} : {},
                  pinCodeContainerStyle,
                ]}>
                {isFocusedInput ? (
                  <VerticalStick
                    focusColor={focusColor}
                    style={focusStickStyle}
                    focusStickBlinkingDuration={focusStickBlinkingDuration}
                  />
                ) : (
                  <Text style={[styles.codeText, pinCodeTextStyle]}>
                    {char}
                  </Text>
                )}
              </Pressable>
            );
          })}
      </View>
      <TextInput
        value={text}
        onChangeText={handleTextChange}
        maxLength={numberOfDigits}
        inputMode="numeric"
        ref={inputRef}
        autoFocus
        style={styles.hiddenInput}
      />
    </View>
  );
});
