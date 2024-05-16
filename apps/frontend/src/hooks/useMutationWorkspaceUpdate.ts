import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContextProvider';
import { z } from 'zod';
import refreshTokenHandler from '../lib/refreshTokenHandler';
import submitActivity from '../lib/submitActivity';
import { TWorkspace } from '../types/workspace.type';
import { toast } from 'react-toastify';

const formSchema = z.object({
  workspace: z.string().min(1, 'Workspace is required').trim()
});

type formType = z.infer<typeof formSchema>;

type useMutationWorkspaceUpdateProps = {
  selectedWorkspaceId: string | undefined;
};

const useMutationWorkspaceUpdate = ({
  selectedWorkspaceId
}: useMutationWorkspaceUpdateProps) => {
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
        responseData.id,
        responseData.title,
        'workspace',
        'updated',
        accessT
      );

      return responseData;
    },
    onSuccess: (data: TWorkspace) => {
      toast.success(`${data.title} is successfully updated`);
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
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
      `${import.meta.env.VITE_API_WORKSPACES}/${selectedWorkspaceId}`,
      {
        method: 'PUT',
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

export default useMutationWorkspaceUpdate;
