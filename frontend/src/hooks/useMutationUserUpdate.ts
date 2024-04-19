import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContextProvider';
import { z } from 'zod';
import refreshTokenHandler from '../lib/refreshTokenHandler';

const formSchema = z
  .object({
    username: z.string().min(1, 'Username is required').trim(),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email')
      .trim(),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(3, 'Password must have min 3 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Password confirmation is required')
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match'
  });

type formType = z.infer<typeof formSchema>;

const useMutationUserUpdate = () => {
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

      return responseData;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });

  const submitHandler = async (
    data: formType,
    token: string | null
  ) => {
    const response = await fetch(`${import.meta.env.VITE_API_USER}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password
      })
    });

    const body = await response.json();

    return body;
  };

  return {
    ...mutation
  };
};

export default useMutationUserUpdate;
