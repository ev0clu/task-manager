import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContextProvider';

const PublicRoutes = () => {
  const { token } = useAuth();

  // Check if the user is authenticated
  if (token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
};

export default PublicRoutes;
