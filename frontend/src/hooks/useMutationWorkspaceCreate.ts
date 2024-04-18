import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContextProvider';
import { z } from 'zod';
import { UseFormReset } from 'react-hook-form';
import { TWorkspace } from '../types/workspace.type';
import submitActivity from '../lib/submitActivity';
import refreshTokenHandler from '../lib/refreshTokenHandler';

const formSchema = z.object({
  workspace: z.string().min(1, 'Workspace is required').trim()
});

type formType = z.infer<typeof formSchema>;

type useMutationWorkspaceCreateProps = {
  toggleModal: () => void;
  reset: UseFormReset<{
    workspace: string;
  }>;
};

const useMutationWorkspaceCreate = ({
  toggleModal,
  reset
}: useMutationWorkspaceCreateProps) => {
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

      const responseData: TWorkspace = await submitHandler(
        data,
        accessT
      );

      await submitActivity(
        `${import.meta.env.VITE_API_WORKSPACES}`,
        responseData.id,
        responseData.title,
        'workspace',
        'created',
        accessT
      );

      return responseData;
    },
    onSuccess: () => {
      reset({
        workspace: ''
      });
      toggleModal();
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    }
  });

  const submitHandler = async (
    data: formType,
    token: string | null
  ) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_WORKSPACES}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          title: data.workspace
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

export default useMutationWorkspaceCreate;
