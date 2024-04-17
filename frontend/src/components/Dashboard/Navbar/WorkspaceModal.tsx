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
import useMutationWorkspaceCreate from '../../../hooks/useMutationWorkspaceCreate';

const formSchema = z.object({
  workspace: z.string().min(1, 'Workspace is required').trim()
});

type formType = z.infer<typeof formSchema>;

type WorkspaceModalProps = {
  openModal: boolean;
  toggleModal: () => void;
};

const WorkspaceModal = ({
  openModal,
  toggleModal
}: WorkspaceModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspace: ''
    }
  });

  const workspaceMutation = useMutationWorkspaceCreate({
    toggleModal,
    reset
  });

  const onSubmit = (data: formType) => {
    workspaceMutation.mutate(data);
  };

  return (
    <Modal
      keepMounted
      open={openModal}
      onClose={() => {
        reset({
          workspace: ''
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
            Create Workspace
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
                name="workspace"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="outlined-basic"
                    label="Workspace"
                    variant="outlined"
                    {...field}
                  />
                )}
              />
              <FormHelperText
                id="workspace-error-text"
                error={
                  errors.workspace?.message !== '' ? true : false
                }
              >
                {errors.workspace?.message}
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
                onClick={toggleModal}
              >
                <span>Cancel</span>
              </Button>
              <LoadingButton
                type="submit"
                size="small"
                endIcon={<SendIcon />}
                loading={workspaceMutation.isPending}
                loadingPosition="end"
                variant="contained"
                sx={{ width: '6rem' }}
              >
                <span>Create</span>
              </LoadingButton>
            </Stack>
            {workspaceMutation.error && (
              <FormHelperText error={workspaceMutation.isError}>
                {workspaceMutation.error.message}
              </FormHelperText>
            )}
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default WorkspaceModal;
