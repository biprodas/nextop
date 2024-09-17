export const atob = (base64: string) => {
  const buffer = Buffer.from(base64, 'base64');
  return buffer.toString('utf-8');
};

export const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = JSON.parse(atob(base64));
    return decodedToken;
  } catch (e) {
    return null;
  }
};

export const isTokenExpired = (token: string) => {
  if (!token) return true;
  const decodedToken = decodeJWT(token);
  if (!decodedToken) return true;
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};
