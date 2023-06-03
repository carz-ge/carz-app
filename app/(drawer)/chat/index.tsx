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
  AskSageDocument,
  ChatMessage,
  ChatMessageStatus,
  useAskSage,
  useListChatMessages,
} from '../../../graphql/operations';
import {WS_API_URL} from '../../../lib/api/config';

export default function Chat() {
  console.log('Chat');
  const {data, loading, error, subscribeToMore} = useListChatMessages({
    fetchPolicy: 'cache-and-network',
  });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState<string>('');
  const wsRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    const ws = new WebSocket(WS_API_URL + '/chat');
    wsRef.current = ws;
    ws.onopen = () => {
      console.log('Connected to WebSocket');
    };

    ws.onmessage = event => {
      console.log('data -> ', event);
      const message = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, message]);
    };

    ws.onerror = error => {
      console.error(error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Clean up WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, []);

  // const {
  //   loading: loadingAns,
  //   data: dataAns,
  //   error: errorAns,
  //   variables,
  // } = useAskSage({
  //   variables: {
  //     question: 'test',
  //   },
  // });

  // useEffect(() => {
  //   console.log('sage -> ', dataAns, loadingAns, errorAns, variables);
  // }, [dataAns, loadingAns, errorAns, variables]);

  useEffect(() => {
    if (!loading && data?.listChatMessages) {
      setMessages([]);
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
    // subscribeToMore(
    //   {
    //     document: AskSageDocument,
    //     variables: {
    //       question: text
    //     },
    //     updateQuery: (prev, { subscriptionData}) => {
    //       console.log("subscription data", subscriptionData, prev);
    //       if (!subscriptionData.data) return prev;
    //       return prev;
    //     }
    //   }
    //
    // )
    setText('');
    console.log('clicked ');
    // await sse2(text, answer => {
    //   console.log('answer', answer);
    //   answerText.text = answer;
    //   setMessages([...oldMessages, answerText]);
    //   return false;
    // });
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
