import { jwtDecode } from 'jwt-decode';

const isTokenExpired = (
  accessToken: string | null,
  refreshToken: string | null
) => {
  const decodedAccessToken = jwtDecode(accessToken!);
  const decodedRefreshToken = jwtDecode(refreshToken!);

  const accessTokenExpired =
    decodedAccessToken.exp! * 1000 < Date.now();
  const refreshTokenExpired =
    decodedRefreshToken.exp! * 1000 < Date.now();

  // If either access token or refresh token is expired, return true
  return accessTokenExpired || refreshTokenExpired;
};

export default isTokenExpired;
