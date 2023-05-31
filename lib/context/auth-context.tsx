import {useNavigation, useRouter, useSegments} from 'expo-router';
import React, {
  PropsWithChildren,
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import {isValidToken} from '../auth/utils';

export const ACCESS_TOKEN_KEY = 'access_token';

interface AuthContextType {
  updateAuthToken: (token: string) => Promise<void>;
  removeAuthToken: () => Promise<void>;
  authToken: string | null;
}

const AuthContext = createContext<AuthContextType>({
  updateAuthToken: async _token => {},
  removeAuthToken: async () => {},
  authToken: null,
});

const AuthContextProvider = ({children}: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const segments = useSegments();
  const {push} = useRouter();
  const navigation = useNavigation();
  navigation;
  useEffect(() => {
    const isAuthGroup = segments[0] === 'auth';

    // console.log("auth Token is valid", authToken ? isValidToken(authToken) : null);
    if (isAuthGroup) {
      if (authToken && isValidToken(authToken)) {
        push('/home');
      }
    } else {
      if (!authToken) {
        console.log('no token');
        push('/auth/sign-in');
        return;
      }

      if (authToken && !isValidToken(authToken)) {
        console.log('invalid');
        SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY).then(() =>
          console.log('deleted item 1'),
        );
        setAuthToken(null);
        push('/auth/sign-in');
        return;
      }
    }
  }, [segments, authToken, push]);

  useEffect(() => {
    const loadAuthToken = async () => {
      const res = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      console.log('token res', res);
      if (res) {
        setAuthToken(res);
      }
    };
    loadAuthToken();
  }, []);

  const updateAuthToken = async (newToken: string) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, newToken);
    setAuthToken(newToken);
  };

  const removeAuthToken = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    setAuthToken(null);
  };

  const authContextValue = useMemo(
    () => ({authToken, updateAuthToken, removeAuthToken}),
    [authToken],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
