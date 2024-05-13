import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContextProvider';
import { z } from 'zod';
import { UseFormReset } from 'react-hook-form';
import submitActivity from '../lib/submitActivity';
import refreshTokenHandler from '../lib/refreshTokenHandler';
import { TCard } from '../types/card.type';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').trim(),
  description: z.string().min(1, 'Description is required').trim(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH'])
});

type formType = z.infer<typeof formSchema>;

type useMutationCardCreateProps = {
  toggleModal: () => void;
  reset: UseFormReset<{
    title: string;
    description: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
  }>;
  workspaceId: string | undefined;
  listId: string | undefined;
};

const useMutationCardCreate = ({
  toggleModal,
  reset,
  workspaceId,
  listId
}: useMutationCardCreateProps) => {
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

      const responseData: TCard = await submitHandler(data, accessT);

      await submitActivity(
        `${import.meta.env.VITE_API_WORKSPACES}`,
        workspaceId!,
        responseData.title,
        'card',
        'created',
        accessT
      );

      return responseData;
    },
    onSuccess: () => {
      reset({
        title: '',
        description: '',
        priority: 'LOW'
      });
      toggleModal();
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cards', listId] });
    }
  });

  const submitHandler = async (
    data: formType,
    token: string | null
  ) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_LISTS}/${listId}/cards`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          priority: data.priority
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

export default useMutationCardCreate;
