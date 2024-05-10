import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContextProvider';
import { z } from 'zod';
import refreshTokenHandler from '../lib/refreshTokenHandler';
import submitActivity from '../lib/submitActivity';
import { toast } from 'react-toastify';

const formSchema = z.object({
  board: z.string().min(1, 'Board is required').trim()
});

type formType = z.infer<typeof formSchema>;

type useMutationBoardUpdateProps = {
  boardId: string | undefined;
  boardTitle: string | undefined;
  workspaceId: string | undefined;
};

const useMutationBoardUpdate = ({
  boardId,
  boardTitle,
  workspaceId
}: useMutationBoardUpdateProps) => {
  const queryClient = useQueryClient();
  const { accessToken, refreshToken, setToken, clearToken } =
    useAuth();

  const mutation = useMutation({
    mutationFn: async (data: formType) => {
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

      const responseData = await submitHandler(data, accessT);

      await submitActivity(
        `${import.meta.env.VITE_API_WORKSPACES}`,
        workspaceId!,
        boardTitle!,
        'board',
        'updated',
        accessT
      );

      return responseData;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['board', boardId] });
      toast.success(`${boardTitle} has successfully updated`);
    }
  });

  const submitHandler = async (
    data: formType,
    token: string | null
  ) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BOARDS}/${boardId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          title: data.board
        })
      }
    );

    const body = await response.json();

    return body;
  };

  return {
    ...mutation
  };
};

export default useMutationBoardUpdate;
