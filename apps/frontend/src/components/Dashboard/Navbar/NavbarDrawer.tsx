import { useEffect, useState } from 'react';
import { TWorkspace } from '../../../types/workspace.type';
import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  useMediaQuery,
  Theme,
  ListSubheader,
  Typography,
  Collapse,
  Box
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronLeftRight from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GridViewIcon from '@mui/icons-material/GridView';
import TimelineIcon from '@mui/icons-material/Timeline';
import ApartmentIcon from '@mui/icons-material/Apartment';

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
      width: theme.spacing(9),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}));

type NavbarDrawerProps = {
  toggleModal: () => void;
  workspaces: TWorkspace[] | undefined;
  handleWorkspaceClick: (id: string) => void;
  selectedWorkspace: TWorkspace | undefined;
  selectedWorkspaceMenuItem: 'boards' | 'activities';
  handleBoardsClick: () => void;
  handleActivityClick: () => void;
};

const NavbarDrawer = ({
  toggleModal,
  workspaces,
  handleWorkspaceClick,
  selectedWorkspace,
  selectedWorkspaceMenuItem,
  handleBoardsClick,
  handleActivityClick
}: NavbarDrawerProps) => {
  const matches = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up('sm')
  );
  const [openDrawer, setOpenDrawer] = useState(matches);

  useEffect(() => {
    // Update the state whenever the screen size changes
    setOpenDrawer(matches);
  }, [matches]);

  const toggleDrawer = () => {
    setOpenDrawer((prevVal) => !prevVal);
  };

  const openWorkspaceBtn = () => {
    setOpenDrawer(true);
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
      <List
        component="nav"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          justifyContent: openDrawer ? 'space-between' : 'center',
          alignItems: 'center'
        }}
        subheader={
          openDrawer && (
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              sx={{
                fontWeight: '600',
                fontSize: '1rem'
              }}
            >
              Workspaces
            </ListSubheader>
          )
        }
      >
        <Tooltip title="Add">
          <IconButton onClick={toggleModal}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </List>
      <Divider />
      <List component="nav" sx={{ minWidth: '6rem' }}>
        {workspaces !== undefined &&
          workspaces.map((workspace) => {
            return (
              <Box key={workspace.id}>
                <ListItemButton
                  onClick={() => {
                    handleWorkspaceClick(workspace.id);
                    openWorkspaceBtn();
                  }}
                  selected={
                    selectedWorkspace?.id === workspace.id
                      ? true
                      : false
                  }
                >
                  {openDrawer && (
                    <ListItemIcon>
                      <ApartmentIcon />
                    </ListItemIcon>
                  )}
                  <Typography
                    variant="subtitle1"
                    sx={{
                      textAlign: openDrawer ? 'start' : 'center',
                      marginRight: '0.1rem',
                      width: openDrawer ? '8rem' : 'auto'
                    }}
                    noWrap
                  >
                    {openDrawer
                      ? workspace.title
                      : workspace.title[0]}
                  </Typography>
                  {selectedWorkspace?.id === workspace.id ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItemButton>
                <Collapse
                  in={selectedWorkspace?.id === workspace.id}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItemButton
                      onClick={handleBoardsClick}
                      sx={{ pl: 4 }}
                      selected={
                        selectedWorkspaceMenuItem === 'boards'
                      }
                    >
                      <ListItemIcon>
                        <GridViewIcon />
                      </ListItemIcon>
                      <ListItemText primary="Boards" />
                    </ListItemButton>
                    <ListItemButton
                      onClick={handleActivityClick}
                      sx={{ pl: 4 }}
                      selected={
                        selectedWorkspaceMenuItem === 'activities'
                      }
                    >
                      <ListItemIcon>
                        <TimelineIcon />
                      </ListItemIcon>
                      <ListItemText primary="Activity" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </Box>
            );
          })}
      </List>
    </Drawer>
  );
};

export default NavbarDrawer;
