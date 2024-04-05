import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContextProvider';
import Box from '@mui/material/Box';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProtectedRoutes = () => {
  const { token } = useAuth();

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return (
    <>
      <Header />
      <Box flex={1}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default ProtectedRoutes;
