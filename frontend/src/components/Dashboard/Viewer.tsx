import { Divider, Stack, Typography } from '@mui/material';

import { TWorkspace } from '../../types/workspace.type';
import BoardsViewer from './Viewer/BoardsViewer';
import ActivitiesViewer from './Viewer/ActivitiesViewer';
import HeaderViewer from './Viewer/HeaderViewer';

type ViwerProps = {
  selectedWorkspace: TWorkspace | undefined;
  selectedWorkspaceMenuItem: 'boards' | 'activities';
};

const Viewer = ({
  selectedWorkspace,
  selectedWorkspaceMenuItem
}: ViwerProps) => {
  return (
    <Stack direction={'column'} gap={3} paddingX={'2rem'} flex={1}>
      <HeaderViewer selectedWorkspace={selectedWorkspace} />
      <Divider />
      {selectedWorkspace === undefined ? (
        <Typography variant="h6">Choose a Workspace</Typography>
      ) : selectedWorkspaceMenuItem === 'boards' ? (
        <BoardsViewer selectedWorkspace={selectedWorkspace} />
      ) : (
        <ActivitiesViewer selectedWorkspace={selectedWorkspace} />
      )}
    </Stack>
  );
};

export default Viewer;
