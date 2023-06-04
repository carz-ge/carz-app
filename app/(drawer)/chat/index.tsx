import React, {useEffect, useRef, useState} from 'react';
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
import {createWebsocket} from '../../../lib/api/websocket';

export default function Chat() {
  const {data, loading, error, subscribeToMore} = useListChatMessages({
    fetchPolicy: 'network-only',
  });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState<string>('');
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnectionClosed, setIsConnectionClosed] = useState(true);

  useEffect(() => {
    let ws: WebSocket | null = null;
    if (!isConnectionClosed) {
      return;
    }
    createWebsocket(
      e => {
        setMessages(prevMessages => {
          const chatMessage = Object.assign(
            {},
            prevMessages[prevMessages.length - 1],
          );
          const chatMessages = prevMessages.slice(0, prevMessages.length - 1);

          chatMessage.text += e.data;
          return [...chatMessages, chatMessage];
        });
      },
      () => {
        setIsConnectionClosed(true);
      },
    ).then(websocket => {
      setIsConnectionClosed(false);
      ws = websocket;
      wsRef.current = websocket;
    });
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [isConnectionClosed]);

  useEffect(() => {
    if (!loading && data?.listChatMessages) {
      setMessages(data?.listChatMessages || []);
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
    wsRef.current?.send(text);
    const oldMessages = [...messages, newText];
    setMessages([...oldMessages, answerText]);

    setText('');
    console.log('clicked ');
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
          onChangeText={txt => setText(txt)}
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
    marginBottom: 55,
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
