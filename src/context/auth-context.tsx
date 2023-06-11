import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import {ACCESS_TOKEN_KEY, isValidToken} from '../auth/utils';

interface AuthContextType {
  updateAuthToken: (token: string) => Promise<void>;
  removeAuthToken: () => Promise<void>;
  authToken: string | null;
  loggedIn: boolean | null;
}

const AuthContext = createContext<AuthContextType>({
  updateAuthToken: async _token => {},
  removeAuthToken: async () => {},
  authToken: null,
  loggedIn: null,
});

const AuthContextProvider = ({children}: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);

        if (!token) {
          setAuthToken(null);
          setLoggedIn(false);
          return;
        }

        const isValid = isValidToken(token);

        if (!isValid) {
          await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        }

        setAuthToken(token);
        setLoggedIn(isValid);
        return;
      } catch (err) {
        setAuthToken(null);
        setLoggedIn(false);
        return;
      }
    };
    isLoggedIn();
  }, []);

  const updateAuthToken = useCallback(
    async (newToken: string) => {
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, newToken);
      setAuthToken(newToken);
      if (!loggedIn) {
        setLoggedIn(true);
      }
    },
    [loggedIn],
  );

  const removeAuthToken = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    setAuthToken(null);
    setLoggedIn(false);
  };

  const authContextValue = useMemo(
    () => ({loggedIn, authToken, updateAuthToken, removeAuthToken}),
    [loggedIn, authToken, updateAuthToken],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
