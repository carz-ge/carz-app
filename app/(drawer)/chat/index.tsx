import React, {useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Message from '../../../components/chat/message';
import {FontAwesome} from '@expo/vector-icons';
import {ulid} from 'ulid';
import colors from '../../../lib/styles/colors';
import {
  ChatMessage,
  ChatMessageStatus,
  useListChatMessages,
} from '../../../graphql/operations';
import {sse} from '../../../lib/api/rest/client';

export default function Profile() {
  const {data, loading, error} = useListChatMessages({
    fetchPolicy: 'cache-and-network',
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: ulid(),
      text: 'test',
      isAnswer: false,
      createdAt: '123',
      status: null,
    },
    {
      id: ulid(),
      text: 'testasdasdasdasdasd',
      isAnswer: true,
      status: null,
      createdAt: '123',
    },
    {
      id: ulid(),
      text: 'qweqweqqweqweqweqweqweqweqweqweqweqwe qweq weqw eqw weqweq',
      isAnswer: false,
      status: null,
      createdAt: '123',
    },
    {
      id: ulid(),
      text: 'te stasd asdas das dasd',
      isAnswer: true,
      status: null,

      createdAt: '123',
    },
  ]);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    if (!loading && data?.listChatMessages) {
      setMessages(data.listChatMessages);
    }
  }, [data, loading]);

  const handleSendMessage = async () => {
    if (!text.trim()) return;

    const newText: ChatMessage = {
      id: ulid(),
      createdAt: '123',
      status: ChatMessageStatus.Success,
      text: text.trim(),
      isAnswer: false,
    };

    const answerText: ChatMessage = {
      id: ulid(),
      createdAt: '1234',
      status: ChatMessageStatus.Success,
      text: '',
      isAnswer: true,
    };

    const oldMessages = [...messages, newText];
    setMessages([...oldMessages, answerText]);
    setText('');
    await sse(text, answer => {
      answerText.text = answer;
      setMessages([...oldMessages, answerText]);
      return false;
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          style={styles.listContainer}
          data={messages}
          renderItem={({item}) => <Message message={item} />}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => setMessages([])}
            />
          }
        />
      </View>
      <View style={styles.inputMessage}>
        <TextInput
          style={styles.input}
          onChangeText={text => setText(text)}
          value={text}
        />
        <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
          <FontAwesome name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 10,
  },
  listContainer: {
    width: '100%',
    marginBottom: 35,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputMessage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  input: {
    width: '75%',
    height: 50,
    padding: 10,
    fontSize: 14,
    color: '#ffffff',
    borderRadius: 5,
    backgroundColor: colors.gray,
  },
  button: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
    height: 50,
    marginLeft: 10,
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});
