import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContextProvider';
import refreshTokenHandler from '../lib/refreshTokenHandler';
import submitActivity from '../lib/submitActivity';

type useMutationWorkspaceDeleteProps = {
  selectedWorkspaceId: string | undefined;
  handleWorkspaceClick: (id: string) => void;
};

const useMutationWorkspaceDelete = ({
  selectedWorkspaceId,
  handleWorkspaceClick
}: useMutationWorkspaceDeleteProps) => {
  const queryClient = useQueryClient();
  const { accessToken, refreshToken, setToken, clearToken } =
    useAuth();

  const mutation = useMutation({
    mutationFn: async () => {
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

      const responseData = await submitHandler(accessT);

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
      `${import.meta.env.VITE_API_WORKSPACES}/${selectedWorkspaceId}`,
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
