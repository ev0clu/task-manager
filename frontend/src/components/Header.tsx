import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import logoSrc from '../assets/logo.png';
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Stack
      direction={'row'}
      spacing={1}
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{ padding: '0.5rem' }}
    >
      <Stack direction={'row'} spacing={1}>
        <Box
          component="img"
          sx={{
            height: '2rem',
            width: 'auto'
          }}
          src={logoSrc}
          alt="logo-img"
        />
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Task Manager
        </Typography>
      </Stack>
      <Stack
        direction={'row'}
        spacing={1}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <IconButton
          aria-label="logout"
          size="medium"
          color="primary"
          onClick={toggleTheme}
        >
          <SettingsIcon />
        </IconButton>
        <IconButton
          aria-label="logout"
          size="medium"
          color="primary"
          onClick={toggleTheme}
        >
          <LoginIcon />
        </IconButton>
        <IconButton
          aria-label="logout"
          size="medium"
          color="primary"
          onClick={toggleTheme}
        >
          <LogoutIcon />
        </IconButton>
        <IconButton
          aria-label="toggle theme"
          size="medium"
          color="primary"
          onClick={toggleTheme}
        >
          {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default Header;
