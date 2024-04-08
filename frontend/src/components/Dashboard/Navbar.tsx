import { useEffect, useState } from 'react';
import WorkspaceModal from './Navbar/WorkspaceModal';
import NavbarDrawer from './Navbar/NavbarDrawer';
import { useAuth } from '../../context/AuthContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import { TWorkspace } from '../../types/workspace.type';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { accessToken, refreshToken, setToken, clearToken } =
    useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [workspaces, setWorkspaces] = useState<TWorkspace[]>([]);
  const [unauthorized, setUnauthorized] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const getWorkspaces = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_WORKSPACES}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + accessToken
            }
          }
        );

        const body = await response.json();

        if (response.ok) {
          setWorkspaces(body);
          setUnauthorized(false);
        } else {
          if (body && body.message === 'Unauthorized') {
            setUnauthorized(true);
          } else {
            toast.error('An unexpected error occurred');
          }
        }
      } catch (error) {
        toast.error('An unexpected error occurred');
      }
    };

    if (accessToken || !unauthorized) {
      getWorkspaces();
    }
  }, [unauthorized]);

  useEffect(() => {
    const getNewTokens = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_JWT_REFRESH}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + refreshToken
            }
          }
        );

        const body = await response.json();

        if (response.ok) {
          setToken(body.access_token, body.refresh_token);
        } else {
          clearToken();
        }

        setUnauthorized(false);
      } catch (error) {
        toast.error('An unexpected error occurred');
      }
    };

    if (unauthorized) {
      getNewTokens();
    }
  }, [unauthorized]);

  const toggleModal = () => {
    setOpenModal((prevVal) => !prevVal);
  };

  return (
    <>
      {!mounted || unauthorized ? (
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
            accessToken={accessToken}
          />
        </>
      )}
    </>
  );
};

export default Navbar;
