import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Modal,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useMutationListUpdate from '../../../hooks/useMutationListUpdate';

const formSchema = z.object({
  list: z.string().min(1, 'List is required').trim()
});

type formType = z.infer<typeof formSchema>;

type ListModalUpdateProps = {
  openModal: boolean;
  toggleModal: () => void;
  workspaceId: string | undefined;
  boardId: string | undefined;
  listId: string | undefined;
};

const ListModalUpdate = ({
  openModal,
  toggleModal,
  workspaceId,
  boardId,
  listId
}: ListModalUpdateProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      list: ''
    }
  });

  const listMutation = useMutationListUpdate({
    toggleModal,
    reset,
    workspaceId,
    boardId,
    listId
  });

  const onSubmit = (data: formType) => {
    listMutation.mutate(data);
  };

  return (
    <Modal
      open={openModal}
      onClose={() => {
        reset({
          list: ''
        });
        toggleModal();
      }}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4
        }}
      >
        <Box sx={{ width: '30ch', marginX: 'auto' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              marginBottom: '1rem'
            }}
          >
            Update List
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction={'column'}
            spacing={1}
            alignItems={'center'}
          >
            <FormControl
              sx={{ m: 1, width: '30ch' }}
              variant="outlined"
            >
              <Controller
                name="list"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="outlined-basic"
                    label="List"
                    variant="outlined"
                    {...field}
                  />
                )}
              />
              <FormHelperText
                id="list-error-text"
                error={errors.list?.message !== '' ? true : false}
              >
                {errors.list?.message}
              </FormHelperText>
            </FormControl>

            <Stack
              direction={'row'}
              flex={1}
              gap={2}
              justifyContent={'space-between'}
              sx={{ m: 1, width: '30ch' }}
            >
              <Button
                type="button"
                size="small"
                variant="contained"
                sx={{ width: '6rem' }}
                onClick={() => {
                  reset({
                    list: ''
                  });
                  toggleModal();
                }}
              >
                <span>Cancel</span>
              </Button>
              <LoadingButton
                type="submit"
                size="small"
                endIcon={<SendIcon />}
                loading={listMutation.isPending}
                loadingPosition="end"
                variant="contained"
                sx={{ width: '6rem' }}
              >
                <span>Update</span>
              </LoadingButton>
            </Stack>
            {listMutation.error && (
              <FormHelperText error={listMutation.isError}>
                {listMutation.error.message}
              </FormHelperText>
            )}
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default ListModalUpdate;
