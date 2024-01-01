import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import { useAuth } from '../AuthProvider'; 

import App from '../App';
import { Box } from '@chakra-ui/react';

interface ProtectedRouteProps { 
  isAllowed: boolean;
  redirectPath?: string;
  children?: React.ReactNode;
}

export default function Root() {

  const { token } = useAuth();
  
  return (
      <>
      <Navbar /> 
  
      <Routes>
        <Route index element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route element={<ProtectedRoute isAllowed={!!token} redirectPath='login' />}>
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route
          path="analytics"
          element={
            <ProtectedRoute
              redirectPath="/login"
              isAllowed={
                !!token && token.permissions.includes('analyze')
              }
            >
              <Analytics />
            </ProtectedRoute>
          }
        />
       <Route
          path="admin"
          element={
            <ProtectedRoute
              redirectPath="/login"
              isAllowed={!!token && token.roles.includes('admin')}
            >
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
    isAllowed,
    redirectPath = '/',
    children,
 }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};


const Login = () => {
  return (
    <>
      <Box mt="90px" mx="4">
      <h2>Login (Public: anyone can access this page)</h2>
      </Box>
      
    </>
  );
};

const About = () => {
  return (
    <>
      <Box mt="90px" mx="4">
      <h2>About (Public: anyone can access this page)</h2>
      </Box>
      
    </>
  );
};

const Home = () => {
  return <h2>Home (Protected: authenticated user required)</h2>;
};

const Dashboard = () => {
  return <h2>Dashboard (Protected: authenticated user required)</h2>;
};

const Analytics = () => {
  return (
    <h2>
      Analytics (Protected: authenticated user with permission
      'analyze' required)
    </h2>
  );
};

const Admin = () => {
  return (
    <h2>
      Admin (Protected: authenticated user with role 'admin' required)
    </h2>
  );
};