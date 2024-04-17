import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContextProvider';
import isTokenExpired from '../lib/isTokenExpired';
import { TWorkspace } from '../types/workspace.type';

type useMutationWorkspaceDeleteProps = {
  selectedWorkspace: TWorkspace | undefined;
  handleWorkspaceClick: (id: string) => void;
};

const useMutationWorkspaceDelete = ({
  selectedWorkspace,
  handleWorkspaceClick
}: useMutationWorkspaceDeleteProps) => {
  const queryClient = useQueryClient();
  const { accessToken, refreshToken, setToken, clearToken } =
    useAuth();

  const mutation = useMutation({
    mutationFn: async () => {
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

      const responseData = await submitHandler(accesT);

      return responseData;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      handleWorkspaceClick('');
    }
  });

  const submitHandler = async (token: string | null) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_WORKSPACES}/${selectedWorkspace?.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      }
    );

    const body = await response.json();

    return body;
  };

  return {
    ...mutation
  };
};

export default useMutationWorkspaceDelete;
