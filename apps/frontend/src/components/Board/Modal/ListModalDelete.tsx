import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import useMutationListDelete from '../../../hooks/useMutationListDelete';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import { orange } from '@mui/material/colors';

type ListModalDeleteProps = {
  openModal: boolean;
  toggleModal: () => void;
  workspaceId: string | undefined;
  boardId: string | undefined;
  listId: string | undefined;
  listTitle: string | undefined;
};

const ListModalDelete = ({
  openModal,
  toggleModal,
  workspaceId,
  boardId,
  listId,
  listTitle
}: ListModalDeleteProps) => {
  const listMutation = useMutationListDelete({
    toggleModal,
    workspaceId,
    boardId,
    listId,
    listTitle
  });

  return (
    <Modal
      open={openModal}
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
            variant="h6"
            sx={{
              fontWeight: 600
            }}
          >
            Are you absolutely sure to delete:{' '}
            <Typography
              component="span"
              sx={{
                color: orange[800],
                fontWeight: 600,
                fontSize: '1.3rem'
              }}
            >
              {listTitle}
            </Typography>
          </Typography>
        </Box>
        <Box sx={{ width: '30ch', marginX: 'auto' }}>
          <Typography
            variant="body2"
            sx={{
              marginBottom: '1rem'
            }}
          >
            This action cannot be undone. This will permanently delete
            {listTitle} from our server.
          </Typography>
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
              loading={listMutation.isPending}
              loadingPosition="end"
              variant="contained"
              sx={{ width: '6rem' }}
              onClick={() => listMutation.mutate()}
            >
              <span>Delete</span>
            </LoadingButton>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default ListModalDelete;
