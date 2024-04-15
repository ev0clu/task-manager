import { Stack, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { TWorkspace } from '../../../types/workspace.type';

type HeaderViewerProps = {
  selectedWorkspace: TWorkspace | undefined;
};

const HeaderViewer = ({ selectedWorkspace }: HeaderViewerProps) => {
  return (
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
  );
};

export default HeaderViewer;
