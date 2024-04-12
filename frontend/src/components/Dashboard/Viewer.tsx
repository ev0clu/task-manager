import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { TWorkspace } from '../../types/workspace.type';
import { grey, green, lightBlue, red } from '@mui/material/colors';

type ViwerProps = {
  workspaces: TWorkspace[] | undefined;
  selectedWorkspace: TWorkspace | undefined;
};

const Viewer = ({ workspaces, selectedWorkspace }: ViwerProps) => {
  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ padding: '2rem', height: 'max-content' }}
    >
      {workspaces !== undefined &&
        selectedWorkspace !== undefined &&
        selectedWorkspace.boards?.map((board) => {
          return (
            <Grid
              key={board.id}
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
                margin: '0.3rem'
              }}
            >
              <Typography variant="subtitle2">
                {board.title}
              </Typography>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default Viewer;
