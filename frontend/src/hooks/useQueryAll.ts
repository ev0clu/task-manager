import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContextProvider';
import isTokenExpired from '../lib/isTokenExpired';
import fetchAll from '../lib/fetchAll';

type TGenericUseQueryResponse<T> = Omit<
  UseQueryResult<T, unknown>,
  'data'
> & {
  data: T | undefined;
};

const useQueryAll = <T>(
  qKey: string,
  url: string
): TGenericUseQueryResponse<T> => {
  const { accessToken, refreshToken, setToken, clearToken } =
    useAuth();

  const query = useQuery({
    queryKey: [qKey],
    queryFn: async () => {
      let accesT = accessToken;
      let refreshT = refreshToken;

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      if (isTokenExpired(accesT, refreshT)) {
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
          const { access_token, refresh_token } =
            await response.json();
          accesT = access_token;
          refreshT = refresh_token;
          setToken(access_token, refresh_token);
        } else {
          clearToken();
          // If refresh token is also expired or invalid, redirect to login
          throw new Error('Refresh token failed');
        }
      }

      // Use the fetcher function to make the request with the access token
      const data = await fetchAll(url, accesT);

      return data;
    },

    retry: (_, error) => {
      if (
        error instanceof Error &&
        error.message === 'Unauthorized'
      ) {
        return true;
      }
      return false;
    }
  });

  return query as TGenericUseQueryResponse<T>;
};

export default useQueryAll;
