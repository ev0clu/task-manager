import HomePage from '../pages/HomePage.tsx';
import LoginPage from '../pages/LoginPage.tsx';
import RegisterPage from '../pages/RegisterPage.tsx';
import ErrorBoundary from '../components/ErrorBoundary.tsx';
import DashboardPage from '../pages/Dashboard.tsx';
import ProfilePage from '../pages/ProfilePage.tsx';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes.tsx';
import PublicRoutes from './PublicRoutes.tsx';

const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Routes accessible only to non-authenticated users  */}
        <Route
          path="/"
          element={<PublicRoutes />}
          errorElement={<ErrorBoundary />}
        >
          <Route index={true} path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Routes accessible only to authenticated users  */}
        <Route
          path="/"
          element={<ProtectedRoutes />}
          errorElement={<ErrorBoundary />}
        >
          <Route
            index={true}
            path="/dashboard"
            element={<DashboardPage />}
          />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default Routes;
