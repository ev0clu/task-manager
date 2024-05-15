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
import { TCard } from '../../../types/card.type';
import useMutationCardUpdate from '../../../hooks/useMutationCardUpdate';

const priorityEnum = ['LOW', 'MEDIUM', 'HIGH'];

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').trim(),
  description: z.string().min(1, 'Description is required').trim(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH'])
});

type formType = z.infer<typeof formSchema>;

type CardModalUpdateProps = {
  openModal: boolean;
  toggleModal: (id: string) => void;
  workspaceId: string | undefined;
  listId: string | undefined;
  card: TCard | undefined;
};

const CardModalUpdate = ({
  openModal,
  toggleModal,
  workspaceId,
  listId,
  card
}: CardModalUpdateProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: card?.title,
      description: card?.description,
      priority: card?.priority
    },
    values: {
      title: card?.title ?? '',
      description: card?.description ?? '',
      priority: card?.priority ?? 'LOW'
    }
  });

  const cardMutation = useMutationCardUpdate({
    toggleModal,
    workspaceId,
    listId,
    cardId: card?.id
  });

  const onSubmit = (data: formType) => {
    cardMutation.mutate(data);
  };

  return (
    <Modal
      open={openModal}
      onClose={toggleModal}
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
            Update Card
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
                id="title-error-text"
                error={errors.title?.message !== '' ? true : false}
              >
                {errors.title?.message}
              </FormHelperText>
            </FormControl>

            <FormControl
              sx={{ m: 1, width: '30ch' }}
              variant="outlined"
            >
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="outlined-textarea"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    {...field}
                  />
                )}
              />
              <FormHelperText
                id="description-error-text"
                error={
                  errors.description?.message !== '' ? true : false
                }
              >
                {errors.description?.message}
              </FormHelperText>
            </FormControl>

            <FormControl
              sx={{ m: 1, width: '30ch' }}
              variant="outlined"
            >
              <InputLabel id="select-label">Priority</InputLabel>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="select-label"
                    id="select-helper"
                    label="Priority"
                    {...field}
                  >
                    {priorityEnum.map((priority, index) => {
                      return (
                        <MenuItem
                          key={priority + index}
                          value={priority}
                        >
                          {priority}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
              <FormHelperText
                id="priority-error-text"
                error={errors.priority?.message !== '' ? true : false}
              >
                {errors.priority?.message}
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
                onClick={() => toggleModal('')}
              >
                <span>Cancel</span>
              </Button>
              <LoadingButton
                type="submit"
                size="small"
                endIcon={<SendIcon />}
                loading={cardMutation.isPending}
                loadingPosition="end"
                variant="contained"
                sx={{ width: '6rem' }}
              >
                <span>Update</span>
              </LoadingButton>
            </Stack>
            {cardMutation.error && (
              <FormHelperText error={cardMutation.isError}>
                {cardMutation.error.message}
              </FormHelperText>
            )}
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default CardModalUpdate;
