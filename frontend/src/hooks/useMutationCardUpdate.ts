import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContextProvider';
import { z } from 'zod';
import submitActivity from '../lib/submitActivity';
import refreshTokenHandler from '../lib/refreshTokenHandler';
import { TCard } from '../types/card.type';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').trim(),
  description: z.string().min(1, 'Description is required').trim(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH'])
});

type formType = z.infer<typeof formSchema>;

type useMutationCardUpdateProps = {
  toggleModal: (id: string) => void;
  workspaceId: string | undefined;
  listId: string | undefined;
  cardId: string | undefined;
};

const useMutationCardUpdate = ({
  toggleModal,
  workspaceId,
  listId,
  cardId
}: useMutationCardUpdateProps) => {
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
        'updated',
        accessT
      );

      return responseData;
    },
    onSuccess: () => {
      toggleModal(cardId!);
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cards', listId] });
    }
  });

  const submitHandler = async (
    data: formType,
    token: string | null
  ) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_CARDS}/${cardId}`,
      {
        method: 'PUT',
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

export default useMutationCardUpdate;
