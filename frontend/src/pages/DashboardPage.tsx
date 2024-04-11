import { useEffect, useState } from 'react';
import Navbar from '../components/Dashboard/Navbar';
import { Box, CircularProgress } from '@mui/material';
import Viewer from '../components/Dashboard/Viewer';

const DashboardPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {!mounted ? (
        <Box
          flex={1}
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
          <Navbar />
          <Viewer />
        </Box>
      )}
    </>
  );
};

export default DashboardPage;
