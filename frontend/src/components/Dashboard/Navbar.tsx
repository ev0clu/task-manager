import { useState } from 'react';
import WorkspaceModal from './Navbar/WorkspaceModal';
import NavbarDrawer from './Navbar/NavbarDrawer';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import useQueryAll from '../../hooks/useQueryAll';
import { TWorkspace } from '../../types/workspace.type';

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);

  const { data: workspaces, isPending } = useQueryAll<TWorkspace[]>(
    'workspaces',
    `${import.meta.env.VITE_API_WORKSPACES}`
  );

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
