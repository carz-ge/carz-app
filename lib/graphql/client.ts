import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import {DefaultOptions} from '@apollo/client/core/ApolloClient';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import * as SecureStore from 'expo-secure-store';
import {ACCESS_TOKEN_KEY} from '../context/auth-context';
import {API_URL} from './config';

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
const setupApollo = (uri: string) => {
  const httpLink = createHttpLink({
    uri,
    credentials: 'include',
  });

  const authLink = setContext(async (_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const logoutLink = onError(_ => {});

  let link = logoutLink.concat(authLink).concat(httpLink);
  return new ApolloClient({
    link,
    cache,
    defaultOptions,
  });
};

export const client: ApolloClient<NormalizedCacheObject> = setupApollo(API_URL);
