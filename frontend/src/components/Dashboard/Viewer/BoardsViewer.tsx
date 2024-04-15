import { Box, Button, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { grey, green, lightBlue, red } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { TWorkspace } from '../../../types/workspace.type';

type BoardsViewerProps = {
  selectedWorkspace: TWorkspace | undefined;
};

const BoardsViewer = ({ selectedWorkspace }: BoardsViewerProps) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ opacity: '0.8' }}>
        Boards
      </Typography>
      <Grid
        container
        spacing={2}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ height: 'max-content', marginTop: '0.2rem' }}
      >
        {selectedWorkspace !== undefined &&
          selectedWorkspace.boards?.map((board) => {
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
    </Box>
  );
};

export default BoardsViewer;
