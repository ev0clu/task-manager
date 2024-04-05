import { useEffect, useState } from 'react';
import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronLeftRight from '@mui/icons-material/ChevronRight';
import WorkIcon from '@mui/icons-material/Work';
import { toast } from 'react-toastify';
import { TWorkspace } from '../../../types/workspace.type';

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}));

type NavbarDrawerProps = {
  toggleModal: () => void;
  token: string | null;
};

const NavbarDrawer = ({ toggleModal, token }: NavbarDrawerProps) => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [workspaces, setWorkspaces] = useState<TWorkspace[]>();

  useEffect(() => {
    const getWorkspaces = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_WORKSPACES}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token
            }
          }
        );

        const body = await response.json();
        if (response.ok) {
          setWorkspaces(body);
        } else {
          if (body) {
            toast.error(body);
          } else {
            toast.error('An unexpected error occurred');
          }
        }
      } catch (error) {
        toast.error('An unexpected error occurred');
      }
    };

    if (token) {
      getWorkspaces();
    }
  }, []);

  const toggleDrawer = () => {
    setOpenDrawer((prevVal) => !prevVal);
  };

  return (
    <Drawer variant="permanent" open={openDrawer}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1]
        }}
      >
        <IconButton onClick={toggleDrawer}>
          {openDrawer ? <ChevronLeftIcon /> : <ChevronLeftRight />}
        </IconButton>
      </Toolbar>
      <List component="nav">
        <Stack
          direction={'row'}
          gap={1}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{ px: '1rem' }}
        >
          {openDrawer && <ListItemText primary="Workspaces" />}
          <Tooltip title="Add">
            <IconButton onClick={toggleModal}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </List>
      <Divider />
      <List component="nav">
        {workspaces &&
          workspaces.map((workspace) => {
            return (
              <ListItemButton key={workspace.id}>
                {openDrawer && (
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                )}
                <ListItemText
                  sx={{ textAlign: 'center' }}
                  primary={
                    openDrawer ? workspace.title : workspace.title[0]
                  }
                />
              </ListItemButton>
            );
          })}
      </List>
    </Drawer>
  );
};

export default NavbarDrawer;
