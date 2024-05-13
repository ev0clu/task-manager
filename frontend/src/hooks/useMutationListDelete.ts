import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContextProvider';
import submitActivity from '../lib/submitActivity';
import refreshTokenHandler from '../lib/refreshTokenHandler';
import { toast } from 'react-toastify';

type useMutationListDeleteProps = {
  toggleModal: () => void;
  workspaceId: string | undefined;
  boardId: string | undefined;
  listId: string | undefined;
  listTitle: string | undefined;
};

const useMutationListDelete = ({
  toggleModal,
  workspaceId,
  boardId,
  listId,
  listTitle
}: useMutationListDeleteProps) => {
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

      await submitActivity(
        `${import.meta.env.VITE_API_WORKSPACES}`,
        workspaceId!,
        listTitle!,
        'board',
        'deleted',
        accessT
      );

      return responseData;
    },
    onSuccess: () => {
      toggleModal();
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['board', boardId]
      });
      toast.success(`${listTitle} has successfully deleted`);
    }
  });

  const submitHandler = async (token: string | null) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_LISTS}/${listId}`,
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

export default useMutationListDelete;
