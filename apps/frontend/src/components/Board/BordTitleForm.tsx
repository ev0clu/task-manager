import { useState } from 'react';
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  Stack,
  TextField
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TBoard } from '../../types/board.type';
import useMutationBoardUpdate from '../../hooks/useMutationBoardUpdate';
import useMutationBoardDelete from '../../hooks/useMutationBoardDelete';

const formSchema = z.object({
  board: z.string().min(1, 'Board is required').trim()
});

type formType = z.infer<typeof formSchema>;

type BoardTitleFormProps = {
  board: TBoard | undefined;
};

const BoardTitleForm = ({ board }: BoardTitleFormProps) => {
  const [onFocused, setOnFocused] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      board: board?.title
    },
    values: {
      board: `${board?.title}`
    }
  });

  const updateMutation = useMutationBoardUpdate({
    boardId: board?.id,
    boardTitle: board?.title,
    workspaceId: board?.workspaceId
  });

  const deleteMutation = useMutationBoardDelete({
    boardId: board?.id,
    boardTitle: board?.title,
    workspaceId: board?.workspaceId
  });

  const onSubmit = (data: formType) => {
    updateMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction={'row'}
        spacing={1}
        alignItems={'center'}
        onMouseEnter={() => setOnFocused(true)}
        onMouseLeave={() => setOnFocused(false)}
      >
        <FormControl
          sx={{ m: 1, width: 'auto' }}
          id="outlined-basic"
          variant="outlined"
        >
          <Controller
            name="board"
            control={control}
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                variant="outlined"
                inputProps={{ style: { fontSize: '1.5rem' } }}
                sx={{
                  '& fieldset': {
                    border: 'none'
                  }
                }}
                {...field}
              />
            )}
          />
          <FormHelperText
            id="board-error-text"
            error={errors.board?.message !== '' ? true : false}
          >
            {errors.board?.message}
          </FormHelperText>
        </FormControl>
        {onFocused && (
          <>
            <IconButton
              type="submit"
              disabled={
                updateMutation.isPending || deleteMutation.isPending
              }
            >
              {updateMutation.isPending ||
              deleteMutation.isPending ? (
                <CircularProgress />
              ) : (
                <SaveIcon />
              )}
            </IconButton>
            <IconButton
              disabled={
                updateMutation.isPending || deleteMutation.isPending
              }
              onClick={() => {
                deleteMutation.mutate();
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}

        {(updateMutation.error || deleteMutation.error) && (
          <FormHelperText
            error={updateMutation.isError || deleteMutation.isError}
          >
            {updateMutation.error!.message ||
              deleteMutation.error!.message}
          </FormHelperText>
        )}
      </Stack>
    </form>
  );
};

export default BoardTitleForm;
