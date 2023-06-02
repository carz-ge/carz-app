import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import colors from '../../lib/styles/colors';
import {ChatMessage} from '../../graphql/operations';

type MessageProps = {
  message: ChatMessage;
};

const Message = ({message}: MessageProps) => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(message.text);
    ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
  };

  return (
    <View style={message.isAnswer ? styles.messagechatgpt : styles.messageyou}>
      <TouchableOpacity onPress={() => copyToClipboard()}>
        <Text style={styles.text}>{message.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  messagechatgpt: {
    backgroundColor: colors.gray,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  messageyou: {
    backgroundColor: colors.primary,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  author: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 8,
  },
  Image: {
    width: 25,
    height: 25,
    borderRadius: 8,
  },
});
