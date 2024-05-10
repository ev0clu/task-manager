import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContextProvider';
import refreshTokenHandler from '../lib/refreshTokenHandler';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type useMutationBoardDeleteProps = {
  boardId: string | undefined;
  boardTitle: string | undefined;
};

const useMutationBoardDelete = ({
  boardId,
  boardTitle
}: useMutationBoardDeleteProps) => {
  const navigate = useNavigate();
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
      navigate('/');
      toast.success(`${boardTitle} has successfully deleted`);
    }
  });

  const submitHandler = async (token: string | null) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BOARDS}/${boardId}`,
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

export default useMutationBoardDelete;
