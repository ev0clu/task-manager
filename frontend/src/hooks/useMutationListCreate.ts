import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContextProvider';
import { z } from 'zod';
import { UseFormReset } from 'react-hook-form';
import submitActivity from '../lib/submitActivity';
import refreshTokenHandler from '../lib/refreshTokenHandler';
import { TList } from '../types/list.type';

const formSchema = z.object({
  list: z.string().min(1, 'List is required').trim()
});

type formType = z.infer<typeof formSchema>;

type useMutationListCreateProps = {
  toggleModal: () => void;
  reset: UseFormReset<{
    list: string;
  }>;
  workspaceId: string | undefined;
  boardId: string | undefined;
};

const useMutationListCreate = ({
  toggleModal,
  reset,
  workspaceId,
  boardId
}: useMutationListCreateProps) => {
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

      const responseData: TList = await submitHandler(data, accessT);

      await submitActivity(
        `${import.meta.env.VITE_API_WORKSPACES}`,
        workspaceId!,
        responseData.title,
        'list',
        'created',
        accessT
      );

      return responseData;
    },
    onSuccess: () => {
      reset({
        list: ''
      });
      toggleModal();
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['board', boardId] });
    }
  });

  const submitHandler = async (
    data: formType,
    token: string | null
  ) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BOARDS}/${boardId}/lists`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          title: data.list
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

export default useMutationListCreate;
