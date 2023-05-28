import jwtDecode from 'jwt-decode';

export function isValidToken(token: string) {
  const decoded: {exp: string; iss: string; sub: string} = jwtDecode(token);

  const now = new Date();
  const exp = new Date(+decoded.exp * 1000);

  return exp > now;
}
