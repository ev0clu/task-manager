import { useState } from 'react';
import WorkspaceModal from './Navbar/WorkspaceModal';
import NavbarDrawer from './Navbar/NavbarDrawer';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import { TWorkspace } from '../../types/workspace.type';

type NavbarProps = {
  workspaces: TWorkspace[] | undefined;
  isPending: boolean;
  handleWorkspaceClick: (id: string) => void;
  selectedWorkspace: TWorkspace | undefined;
};

const Navbar = ({
  workspaces,
  isPending,
  handleWorkspaceClick,
  selectedWorkspace
}: NavbarProps) => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal((prevVal) => !prevVal);
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
        <>
          <NavbarDrawer
            toggleModal={toggleModal}
            workspaces={workspaces}
            handleWorkspaceClick={handleWorkspaceClick}
            selectedWorkspace={selectedWorkspace}
          />
          <WorkspaceModal
            openModal={openModal}
            toggleModal={toggleModal}
          />
        </>
      )}
    </>
  );
};

export default Navbar;
