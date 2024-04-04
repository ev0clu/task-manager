import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContextProvider';
import { Box, Button, Typography } from '@mui/material';
import waveImgSrc from '../../assets/white-wave-bg.svg';
import noteImageSrc from '../../assets/note_image.png';

const HeroComponent = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        width: '100%',
        height: { xs: '25rem', sm: '30rem', md: '35em' },
        background:
          'linear-gradient(60deg, rgb(82, 67, 170), rgb(237, 80, 180))',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '1rem',
          maxWidth: '100%',
          mx: {
            xs: '2em',
            sm: '5rem',
            md: '8rem',
            lg: '11rem',
            xl: '14rem'
          }
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '100%', md: '65%' },
            color: '#FFFFFF'
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: {
                xs: '1.5rem',
                sm: '2rem',
                md: '2.3rem',
                lg: '2.3rem',
                xl: '2.3rem'
              }
            }}
          >
            <span style={{ fontWeight: 600 }}>Task Manager</span>{' '}
            helps you organize all tasks
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: {
                xs: '0.8rem',
                sm: '1rem',
                md: '1.3rem',
                lg: '1.3rem',
                xl: '1.3rem'
              },
              lineHeight: { xs: '1rem', sm: '1.5rem' },
              mt: '0.5rem'
            }}
          >
            Keep everything in one place - even if you work from
            different locations.
          </Typography>
          <Button
            href={`${import.meta.env.VITE_FRONTEND_ADDR}/register`}
            variant="contained"
            sx={{ mt: '1rem' }}
          >
            Register
          </Button>
        </Box>
        <Box
          component="img"
          sx={{
            p: '0.5rem',
            height: 'auto',
            width: {
              sm: '15rem',
              md: '20rem',
              lg: '20rem',
              xl: '20rem'
            },
            display: { xs: 'none', sm: 'block' }
          }}
          src={noteImageSrc}
          alt="home-img"
        />
      </Box>
      <Box
        component="img"
        sx={{
          filter:
            theme === 'light'
              ? 'invert(0%)'
              : 'invert(100%) sepia(4%) saturate(6248%) hue-rotate(26deg) brightness(93%) contrast(86%)',
          height: { xs: '2rem', sm: '2rem', md: '5rem' },
          width: 1,
          position: 'absolute',
          bottom: 0
        }}
        src={waveImgSrc}
        alt="wave-img"
      />
    </Box>
  );
};

export default HeroComponent;
