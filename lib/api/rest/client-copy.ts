// import {API_URL} from '../config';
// import * as SecureStore from 'expo-secure-store';
// import {ACCESS_TOKEN_KEY} from '../../context/auth-context';
// // import {URL} from 'react-native-url-polyfill';
// import EventSource, {EventSourceListener} from 'react-native-sse';
//
// export async function sse2(
//   question: string,
//   handler: (data: string) => boolean,
// ) {
//   const url = new URL(`${API_URL}/sage2?q=${question}`);
//   const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
//   if (!token) {
//     console.log("not tokenqwe")
//     return;
//   }
//   const es = new EventSource(url, {
//     headers: {
//       Authorization: 'Bearer ' + token,
//     },
//   });
//   let text = ""
//   const listener: EventSourceListener = event => {
//     console.log(`event => ${JSON.stringify(event)}`);
//     if (event.type === 'open') {
//       console.log('Open SSE connection.');
//     } else if (event.type === 'message') {
//       console.log(event.data);
//       text += event.data || '';
//       handler(text);
//     } else if (event.type === 'error') {
//       console.error('Connection error:', event.message);
//     } else if (event.type === 'exception') {
//       console.error('Error:', event.message, event.error);
//     }
//   };
//
//   es.addEventListener('open', listener);
//   es.addEventListener('message', listener);
//   es.addEventListener('error', listener);
// }
//
// export async function sse(
//   question: string,
//   handler: (data: string) => boolean,
// ) {
//   const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
//   if (!token) {
//     return;
//   }
//
//   const response = await fetch(`${API_URL}/sage?q=${question}`, {
//     // stream: true,
//     keepalive: true,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   console.log(
//     `Result ${response.ok}, ${response.body},
//      res: ${JSON.stringify(response)},
//      json: ${JSON.stringify(await response.json())}`,
//   );
//   if (!response.ok || !response.body) {
//     // console.log(
//     //   `Error ${response.ok}, ${response.body} ${JSON.stringify(response)}`,
//     // );
//     return;
//   }
//   const reader = response.body.getReader();
//   const decoder = new TextDecoder('utf-8');
//   let messageText = '';
//   let isFirstChunk = true;
//
//   const handleChunk = (chunk: Uint8Array) => {
//     if (isFirstChunk) {
//       isFirstChunk = false;
//     }
//
//     const text = decoder.decode(chunk);
//     messageText += text;
//     handler(messageText);
//   };
//
//   const readNextChunk = async () => {
//     const {done, value} = await reader.read();
//     console.log(`done ${done}, value ${value}`);
//     if (done) {
//       return;
//     }
//     handleChunk(value);
//
//     await readNextChunk();
//   };
//
//   try {
//     await readNextChunk();
//   } catch (error) {
//     console.error(':error', error);
//   }
// }
