import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContextProvider';
import fetchAllByItemId from '../lib/fetchAllByItemId';
import refreshTokenHandler from '../lib/refreshTokenHandler';

type TGenericUseQueryResponse<T> = Omit<
  UseQueryResult<T, unknown>,
  'data'
> & {
  data: T | undefined;
};

const useQueryAllByItemId = <T>(
  qKey: string,
  url: string,
  id: string | undefined
): TGenericUseQueryResponse<T> => {
  const { accessToken, refreshToken, setToken, clearToken } =
    useAuth();

  const query = useQuery({
    queryKey: [qKey, id],
    queryFn: async () => {
      if (!accessToken) {
        throw new Error('Access token not found');
      }

      if (!refreshToken) {
        throw new Error('Refresh token not found');
      }

      const accessT = await refreshTokenHandler(
        accessToken,
        refreshToken,
        setToken,
        clearToken
      );

      // Use the fetcher function to make the request with the access token
      const data = await fetchAllByItemId(url, id, qKey, accessT);

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

export default useQueryAllByItemId;
