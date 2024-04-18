import { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Tooltip,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { grey, green, lightBlue, red } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import BoardModal from '../Modal/BoardModal';
import useQueryAllByItemId from '../../../hooks/useQueryAllByItemId';
import { TBoard } from '../../../types/board.type';

type BoardsViewerProps = {
  selectedWorkspaceId: string | undefined;
};

const BoardsViewer = ({ selectedWorkspaceId }: BoardsViewerProps) => {
  const [openModal, setOpenModal] = useState(false);

  const { data: boards, isPending } = useQueryAllByItemId<TBoard[]>(
    'boards',
    `${import.meta.env.VITE_API_WORKSPACES}`,
    selectedWorkspaceId
  );

  const toggleModal = () => {
    setOpenModal((prevVal) => !prevVal);
  };

  return (
    <>
      <Box>
        <Typography variant="h6" sx={{ opacity: '0.8' }}>
          Boards
        </Typography>
        {isPending ? (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid
            container
            spacing={2}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ height: 'max-content', marginTop: '0.2rem' }}
          >
            {boards !== undefined &&
              boards?.map((board) => {
                return (
                  <Button
                    key={board.id}
                    href={`/boards/${board.id}`}
                    variant="text"
                    sx={{
                      padding: 0,
                      textTransform: 'none'
                    }}
                  >
                    <Grid
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: grey[900],
                        background:
                          board.color === 'RED'
                            ? red.A200
                            : board.color === 'GREEN'
                              ? green.A200
                              : board.color === 'BLUE'
                                ? lightBlue.A200
                                : 'initial',
                        borderRadius: '0.4rem',
                        padding: '0.3rem',
                        height: '4rem',
                        minWidth: '8.5rem',
                        width: '8.5rem',
                        margin: '0.3rem',
                        '&:hover': {
                          background: alpha(
                            board.color === 'RED'
                              ? red.A200
                              : board.color === 'GREEN'
                                ? green.A200
                                : board.color === 'BLUE'
                                  ? lightBlue.A200
                                  : 'initial',
                            0.9
                          )
                        }
                      }}
                    >
                      <Typography variant="subtitle2">
                        {board.title}
                      </Typography>
                    </Grid>
                  </Button>
                );
              })}
            <Tooltip title="Add new board">
              <Button
                variant="text"
                sx={{
                  padding: 0,
                  margin: '0.3rem'
                }}
                onClick={toggleModal}
              >
                <Grid
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: grey[900],
                    background: grey[300],
                    borderRadius: '0.4rem',
                    padding: '0.3rem',
                    height: '4rem',
                    minWidth: '8.5rem',
                    width: '8.5rem',
                    '&:hover': {
                      background: alpha(grey[300], 0.9)
                    }
                  }}
                >
                  <AddIcon />
                </Grid>
              </Button>
            </Tooltip>
          </Grid>
        )}
      </Box>
      <BoardModal
        openModal={openModal}
        toggleModal={toggleModal}
        selectedWorkspaceId={selectedWorkspaceId}
      />
    </>
  );
};

export default BoardsViewer;
