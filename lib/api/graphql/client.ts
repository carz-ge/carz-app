import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import {DefaultOptions} from '@apollo/client/core/ApolloClient';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import * as SecureStore from 'expo-secure-store';
import {ACCESS_TOKEN_KEY} from '../../context/auth-context';
import {HTTP_API_URL, WS_API_URL} from '../config';
import {isValidToken} from '../../auth/utils';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';

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

function getAuthHeaders(headers: any, token: string | null) {
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

  const authLink = setContext(async (_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    // return the headers to the context so httpLink can read them
    console.log('apollo token', token, token ? isValidToken(token) : null);

    const authHeaders = getAuthHeaders(headers, token);

    return {
      headers: authHeaders,
    };
  });

  const logoutLink = onError(_ => {});

  let link = logoutLink.concat(authLink).concat(httpLink);

  const wsLink = new WebSocketLink(
    new SubscriptionClient(wsUrl, {
      reconnect: true,
      // connectionParams: {
      // }
    }),
  );
  const splitLink = split(
    ({query}) => {
      const mainDefinition = getMainDefinition(query);
      return (
        mainDefinition.kind === 'OperationDefinition' &&
        mainDefinition.operation === 'subscription'
      );
    },
    wsLink,
    link,
  );
  return new ApolloClient({
    link: splitLink,
    cache,
    defaultOptions,
  });
};

export const client: ApolloClient<NormalizedCacheObject> = setupApollo(
  HTTP_API_URL + '/graphql',
  WS_API_URL + '/graphql',
);
