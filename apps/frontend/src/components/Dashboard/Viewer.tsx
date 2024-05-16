import { Divider, Stack, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { TWorkspace } from '../../types/workspace.type';
import BoardsViewer from './Viewer/BoardsViewer';
import ActivitiesViewer from './Viewer/ActivitiesViewer';
import WorkspaceTitleForm from './Viewer/WorkspaceTitleForm';

type ViwerProps = {
  selectedWorkspace: TWorkspace | undefined;
  selectedWorkspaceMenuItem: 'boards' | 'activities';
  handleWorkspaceClick: (id: string) => void;
};

const Viewer = ({
  selectedWorkspace,
  selectedWorkspaceMenuItem,
  handleWorkspaceClick
}: ViwerProps) => {
  return (
    <Stack direction={'column'} gap={3} paddingX={'2rem'} flex={1}>
      <Stack direction={'row'} gap={2} alignItems={'center'}>
        {selectedWorkspace === undefined ? (
          <>
            <DashboardIcon />
            <Typography variant="h5">Dashboard</Typography>
          </>
        ) : (
          <WorkspaceTitleForm
            selectedWorkspace={selectedWorkspace}
            handleWorkspaceClick={handleWorkspaceClick}
          />
        )}
      </Stack>
      <Divider />
      {selectedWorkspace === undefined ? (
        <Typography variant="h6">Choose a Workspace</Typography>
      ) : selectedWorkspaceMenuItem === 'boards' ? (
        <BoardsViewer selectedWorkspaceId={selectedWorkspace.id} />
      ) : (
        <ActivitiesViewer selectedWorkspace={selectedWorkspace} />
      )}
    </Stack>
  );
};

export default Viewer;
