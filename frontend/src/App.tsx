import Header from './components/Header';
import Footer from './components/Footer';
import Box from '@mui/material/Box';
import Routes from './components/Routes/Routes';

function App() {
  return (
    <Box display={'flex'} flexDirection={'column'} height={'100vh'}>
      <Header />
      <Box flex={1}>
        <Routes />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
