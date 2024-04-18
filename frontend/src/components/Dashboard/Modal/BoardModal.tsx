import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useMutationBoardCreate from '../../../hooks/useMutationBoardCreate';

const colorList = [
  { key: 'RED', value: 'Red' },
  { key: 'GREEN', value: 'Green' },
  { key: 'BLUE', value: 'Blue' }
];

const formSchema = z.object({
  title: z.string().min(1, 'Board is required').trim(),
  color: z.enum(['RED', 'GREEN', 'BLUE'])
});

type formType = z.infer<typeof formSchema>;

type BoardModalProps = {
  openModal: boolean;
  toggleModal: () => void;
  selectedWorkspaceId: string | undefined;
};

const BoardModal = ({
  openModal,
  toggleModal,
  selectedWorkspaceId
}: BoardModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      color: 'RED'
    }
  });

  const boardMutation = useMutationBoardCreate({
    toggleModal,
    reset,
    selectedWorkspaceId
  });

  const onSubmit = (data: formType) => {
    boardMutation.mutate(data);
  };

  return (
    <Modal
      open={openModal}
      onClose={() => {
        reset({
          title: '',
          color: 'RED'
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
            Create Board
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
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    {...field}
                  />
                )}
              />
              <FormHelperText
                id="workspace-error-text"
                error={errors.title?.message !== '' ? true : false}
              >
                {errors.title?.message}
              </FormHelperText>
            </FormControl>
            <FormControl
              sx={{ m: 1, width: '30ch' }}
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-label">
                Color
              </InputLabel>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    {...field}
                  >
                    {colorList.map((color, index) => {
                      return (
                        <MenuItem key={index} value={color.key}>
                          {color.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
              <FormHelperText
                id="workspace-error-text"
                error={errors.title?.message !== '' ? true : false}
              >
                {errors.title?.message}
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
                    title: '',
                    color: 'RED'
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
                loading={boardMutation.isPending}
                loadingPosition="end"
                variant="contained"
                sx={{ width: '6rem' }}
              >
                <span>Create</span>
              </LoadingButton>
            </Stack>
            {boardMutation.error && (
              <FormHelperText error={boardMutation.isError}>
                {boardMutation.error.message}
              </FormHelperText>
            )}
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default BoardModal;
