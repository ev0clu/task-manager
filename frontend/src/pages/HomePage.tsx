import waveImgSrc from '../assets/white-wave-bg.svg';
import { Box } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const HomePage = () => {
  const { theme } = useContext(ThemeContext);
  console.log(theme);
  return (
    <Box
      sx={{
        height: 500,
        background:
          'linear-gradient(60deg, rgb(82, 67, 170), rgb(237, 80, 180))'
      }}
    >
      <Box
        component="img"
        sx={{
          filter: theme === 'light' ? 'invert(0%)' : 'invert(100%)',
          height: 200,
          width: 1
        }}
        src={waveImgSrc}
        alt="wave-img"
      />
    </Box>
  );
};

export default HomePage;
