import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client';
import {DefaultOptions} from '@apollo/client/core/ApolloClient';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import * as SecureStore from 'expo-secure-store';
import {HTTP_API_URL, WS_API_URL} from '../config';
import {ACCESS_TOKEN_KEY, isValidToken} from '../../auth/utils';
import {DefaultContext} from '@apollo/client/core/types';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

export const cache = new InMemoryCache();

function getAuthHeaders(headers: Record<string, any>, token: string | null) {
  const headersClone = {
    ...headers,
  };
  if (token && isValidToken(token)) {
    headersClone.authorization = `Bearer ${token}`;
  }
  return headersClone;
}

const setupApollo = (httpUrl: string, wsUrl: string) => {
  const httpLink = createHttpLink({
    uri: httpUrl,
    credentials: 'include',
  });

  const authLink = setContext(async (_, {headers}): Promise<DefaultContext> => {
    // Get the authentication token from local storage if it exists
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    // Return the headers to the context so httpLink can read them
    console.log('apollo token', token, token ? isValidToken(token) : null);

    const authHeaders = getAuthHeaders(headers as Record<string, any>, token);

    return {
      headers: authHeaders,
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const logoutLink = onError(_ => {});

  const link = logoutLink.concat(authLink).concat(httpLink);

  // const wsLink = new WebSocketLink(
  //   new SubscriptionClient(wsUrl, {
  //     reconnect: true,
  //     // connectionParams: {
  //     // }
  //   }),
  // );
  // const splitLink = split(
  //   ({query}) => {
  //     const mainDefinition = getMainDefinition(query);
  //     return (
  //       mainDefinition.kind === 'OperationDefinition' &&
  //       mainDefinition.operation === 'subscription'
  //     );
  //   },
  //   wsLink,
  //   link,
  // );
  return new ApolloClient({
    link,
    cache,
    defaultOptions,
  });
};

export const client: ApolloClient<NormalizedCacheObject> = setupApollo(
  `${HTTP_API_URL}/graphql`,
  `${WS_API_URL}/graphql`,
);
