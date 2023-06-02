import {API_URL} from '../config';
import * as SecureStore from 'expo-secure-store';
import {ACCESS_TOKEN_KEY} from '../../context/auth-context';

export function sse1(question: string, handler: (data: String) => boolean) {
  const eventSource = new EventSource(`${API_URL}/sage?q=${question}`);
  eventSource.onmessage = e => {
    console.log(e);
    const shouldStop = handler(e.data);

    if (shouldStop) {
      eventSource.close();
    }
  };
}

export async function sse(
  question: string,
  handler: (data: string) => boolean,
) {
  const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  if (!token) {
    return;
  }

  const response = await fetch(`${API_URL}/sage?q=${question}`, {
    // stream: true,
    keepalive: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok || !response.body) {
    console.log(
      `Error ${response.ok}, ${response.body} ${JSON.stringify(response)}`,
    );
    return;
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let messageText = '';
  let isFirstChunk = true;

  const handleChunk = (chunk: Uint8Array) => {
    if (isFirstChunk) {
      isFirstChunk = false;
    }

    const text = decoder.decode(chunk);
    messageText += text;
    handler(messageText);
  };

  const readNextChunk = async () => {
    const {done, value} = await reader.read();
    console.log(`done ${done}, value ${value}`);
    if (done) {
      return;
    }
    handleChunk(value);

    await readNextChunk();
  };

  try {
    await readNextChunk();
  } catch (error) {
    console.error(':error', error);
  }
}
