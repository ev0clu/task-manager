import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContextProvider';
import { z } from 'zod';
import { UseFormReset } from 'react-hook-form';
import submitActivity from '../lib/submitActivity';
import { TBoard } from '../types/board.type';
import refreshTokenHandler from '../lib/refreshTokenHandler';

const formSchema = z.object({
  title: z.string().min(1, 'Board is required').trim(),
  color: z.enum(['RED', 'GREEN', 'BLUE'])
});

type formType = z.infer<typeof formSchema>;

type useMutationBoardCreateProps = {
  toggleModal: () => void;
  reset: UseFormReset<{
    title: string;
    color: 'RED' | 'GREEN' | 'BLUE';
  }>;
  selectedWorkspaceId: string | undefined;
};

const useMutationBoardCreate = ({
  toggleModal,
  reset,
  selectedWorkspaceId
}: useMutationBoardCreateProps) => {
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

      const responseData: TBoard = await submitHandler(data, accessT);

      await submitActivity(
        `${import.meta.env.VITE_API_WORKSPACES}`,
        responseData.workspaceId,
        responseData.title,
        'board',
        'created',
        accessT
      );

      return responseData;
    },
    onSuccess: () => {
      reset({
        title: '',
        color: 'RED'
      });
      toggleModal();
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['boards', selectedWorkspaceId]
      });
      queryClient.invalidateQueries({
        queryKey: ['activities', selectedWorkspaceId]
      });
    }
  });

  const submitHandler = async (
    data: formType,
    token: string | null
  ) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_WORKSPACES}/${selectedWorkspaceId}/boards`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          title: data.title,
          color: data.color
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

export default useMutationBoardCreate;
