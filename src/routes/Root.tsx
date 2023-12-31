import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import { useState } from "react";
import Navbar from '../Navbar';
import AuthProvider from '../AuthProvider';
import App from '../App';


interface AuthorisedUser {
  id: string;
  name: string;
  permissions: string[];
  roles: string[];
}

interface ProtectedRouteProps { 
  isAllowed: boolean;
  redirectPath?: string;
  children?: React.ReactNode;
}


export default function Root() {

  const [user, setUser] = useState(null);
  const handleLogin = () => setUser({ 
    id: '1',
    name: 'Steve',
    permissions: ['analyze'],
    roles: ['admin'],
  });
  const handleLogout = () => setUser(null);

    return (
      <>
      {/* <Navbar /> */}
      <Navigation />

      {user ? (
        <button onClick={handleLogout}>Sign Out : {user.name}</button>
      ) : (
        <button onClick={handleLogin}>Sign In</button>
      )}

      <Routes>
        <Route index element={<App />} />
        <Route path="landing" element={<App />} />
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route
          path="analytics"
          element={
            <ProtectedRoute
              redirectPath="/home"
              isAllowed={
                !!user && user.permissions.includes('analyze')
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
              redirectPath="/home"
              isAllowed={!!user && user.roles.includes('admin')}
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
    redirectPath = '/landing',
    children,
 }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

const Navigation = () => (
  <nav>
    <Link to="/landing">Landing</Link>
    <Link to="/home">Home</Link>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/analytics">Analytics</Link>
    <Link to="/admin">Admin</Link>
  </nav>
);

const Landing = () => {
  return <h2>Landing (Public: anyone can access this page)</h2>;
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