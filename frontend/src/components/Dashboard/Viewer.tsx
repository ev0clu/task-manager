import { Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { TWorkspace } from '../../types/workspace.type';
import { grey, green, lightBlue, red } from '@mui/material/colors';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';

type ViwerProps = {
  selectedWorkspace: TWorkspace | undefined;
};

const Viewer = ({ selectedWorkspace }: ViwerProps) => {
  return (
    <Stack direction={'column'} gap={3} paddingX={'2rem'} flex={1}>
      <Stack direction={'row'} gap={2} alignItems={'center'}>
        {selectedWorkspace === undefined ? (
          <DashboardIcon />
        ) : (
          <ApartmentIcon />
        )}
        <Typography variant="h5">
          {selectedWorkspace !== undefined
            ? selectedWorkspace.title
            : 'Dashboard'}
        </Typography>
      </Stack>
      <Divider />
      {selectedWorkspace === undefined ? (
        <Typography variant="h6">Choose a Workspace</Typography>
      ) : (
        <Grid
          container
          spacing={2}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ height: 'max-content' }}
        >
          {selectedWorkspace !== undefined &&
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
      )}
    </Stack>
  );
};

export default Viewer;
