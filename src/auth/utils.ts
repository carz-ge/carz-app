import jwtDecode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

export const ACCESS_TOKEN_KEY = 'access_token';

export function isValidToken(token: string) {
  const decoded: {exp: string; iss: string; sub: string} = jwtDecode(token);

  const now = new Date();
  const exp = new Date(Number(decoded.exp) * 1000);

  return exp > now;
}

export const isLoggedIn = async () => {
  try {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);

    if (!token) {
      return [false, null];
    }

    const isValid = isValidToken(token);

    if (!isValid) {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    }

    return [isValid, token];
  } catch (err) {
    return [false, null];
  }
};
