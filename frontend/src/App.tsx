//import { useContext } from 'react';
//import { ThemeContext } from './context/ThemeContext';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Box from '@mui/material/Box';

function App() {
  // const { toggleTheme } = useContext(ThemeContext);

  return (
    <Box display={'flex'} flexDirection={'column'} height={'100vh'}>
      <Header />
      <Box flex={1}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
