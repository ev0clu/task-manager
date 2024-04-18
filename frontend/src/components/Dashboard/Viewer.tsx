import { Divider, Stack, Typography } from '@mui/material';

import { TWorkspace } from '../../types/workspace.type';
import BoardsViewer from './Viewer/BoardsViewer';
import ActivitiesViewer from './Viewer/ActivitiesViewer';
import HeaderViewer from './Viewer/HeaderViewer';

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
      <HeaderViewer
        selectedWorkspace={selectedWorkspace}
        handleWorkspaceClick={handleWorkspaceClick}
      />
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
