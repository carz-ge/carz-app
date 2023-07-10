import * as SecureStore from 'expo-secure-store';
import {WS_API_URL} from './config';
import {ACCESS_TOKEN_KEY, isValidToken} from '../auth/utils';

export async function createWebsocket(
  endpoint: string,
  onMessage: (event: WebSocketMessageEvent) => void,
  onClose: () => void,
) {
  const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);

  const headers: Record<string, string> = {};
  if (token && isValidToken(token)) {
    headers.Authorization = `Bearer ${token}`;
  }

  const ws = new WebSocket(
    `${WS_API_URL}/${endpoint}?token=${'test'}`,
    undefined,
    // @ts-ignore  TODO
    {
      headers,
    },
  );
  ws.onopen = () => {
    console.log('Connected to WebSocket');
  };

  ws.onmessage = event => {
    console.log('data -> ', event);
    onMessage(event);
  };

  ws.onerror = error => {
    console.error(error);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
    onClose();
  };
  return ws;
}
