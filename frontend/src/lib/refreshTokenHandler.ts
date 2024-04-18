import isTokenExpired from './isTokenExpired';

const refreshTokenHandler = async (
  accessT: string,
  refreshT: string,
  setToken: (access_token: string, refresh_token: string) => void,
  clearToken: () => void
) => {
  if (isTokenExpired(accessT, refreshT)) {
    // Request to refresh token using refreshToken API endpoint
    const response = await fetch(
      `${import.meta.env.VITE_API_JWT_REFRESH}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + refreshT
        }
      }
    );

    if (response.ok) {
      const { access_token, refresh_token } = await response.json();
      accessT = access_token;
      refreshT = refresh_token;
      setToken(access_token, refresh_token);
    } else {
      clearToken();
      // If refresh token is also expired or invalid, redirect to login
      throw new Error('Refresh token experid');
    }
  }

  return accessT;
};

export default refreshTokenHandler;
