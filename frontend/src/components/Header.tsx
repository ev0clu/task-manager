import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContextProvider';
import logoSrc from '../assets/logo.png';
import {
  Box,
  Link,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { accessToken, clearToken } = useAuth();
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    if (accessToken !== null && accessToken) {
      const decodedAccessToken = jwtDecode(accessToken!);
      if (
        decodedAccessToken !== undefined &&
        typeof decodedAccessToken.sub === 'string'
      ) {
        setUserId(decodedAccessToken.sub);
      }
    }
  }, [accessToken]);

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_LOGOUT}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken
          }
        }
      );

      if (response.ok) {
        clearToken();
        navigate('/');
      } else {
        const body = await response.json();
        clearToken();
        navigate('/');
        toast.error(body.message);
      }
    } catch (error) {
      clearToken();
      navigate('/');
      toast.error('An unexpected error is occured');
    }
  };

  return (
    <Stack
      direction={'row'}
      spacing={1}
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{ padding: '0.5rem' }}
    >
      <Link
        color="inherit"
        underline="none"
        href={accessToken ? '/dashboard' : '/'}
      >
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Box
            component="img"
            sx={{
              height: '2rem',
              width: 'auto'
            }}
            src={logoSrc}
            alt="logo-img"
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              display: {
                xs: 'none',
                sm: 'block'
              }
            }}
          >
            Task Manager
          </Typography>
        </Stack>
      </Link>

      <Stack
        direction={'row'}
        spacing={1}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {accessToken && (
          <Tooltip title="Settings">
            <IconButton
              href={`/profile/${userId}`}
              aria-label="profile"
              size="medium"
              color="primary"
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        )}
        {!accessToken && (
          <Tooltip title="Login">
            <IconButton
              href="/login"
              aria-label="login"
              size="medium"
              color="primary"
            >
              <LoginIcon />
            </IconButton>
          </Tooltip>
        )}
        {accessToken && (
          <Tooltip title="Logout">
            <IconButton
              aria-label="logout"
              size="medium"
              color="primary"
              onClick={logout}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Theme">
          <IconButton
            aria-label="toggle theme"
            size="medium"
            color="primary"
            onClick={toggleTheme}
          >
            {theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default Header;
