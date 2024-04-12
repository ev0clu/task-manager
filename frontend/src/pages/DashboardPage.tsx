import { useState } from 'react';
import Navbar from '../components/Dashboard/Navbar';
import { Box, CircularProgress } from '@mui/material';
import Viewer from '../components/Dashboard/Viewer';
import useQueryAll from '../hooks/useQueryAll';
import { TWorkspace } from '../types/workspace.type';

const DashboardPage = () => {
  const [selectedWorkspace, setSelectedWorkspace] =
    useState<TWorkspace>();

  const { data: workspaces, isPending } = useQueryAll<TWorkspace[]>(
    'workspaces',
    `${import.meta.env.VITE_API_WORKSPACES}`
  );

  const handleWorkspaceClick = (id: string) => {
    const filteredWorkspace = workspaces?.find(
      (workspace) => workspace.id === id
    );
    setSelectedWorkspace((prevVal) =>
      prevVal !== undefined && prevVal.id === filteredWorkspace?.id
        ? undefined
        : filteredWorkspace
    );
  };

  return (
    <>
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            height: '100%'
          }}
        >
          <Navbar
            workspaces={workspaces}
            isPending={isPending}
            handleWorkspaceClick={handleWorkspaceClick}
            selectedWorkspace={selectedWorkspace}
          />
          <Viewer selectedWorkspace={selectedWorkspace} />
        </Box>
      )}
    </>
  );
};

export default DashboardPage;
