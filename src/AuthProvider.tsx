 import { useState, useContext, createContext } from 'react';
 
 const fakeAuth = () =>
    new Promise((resolve) => {
    setTimeout(() => resolve({ 
        id: '1',
        name: 'Steve Green',
        permissions: ['analyze'],
        roles: ['admin'],
      }), 2500);
 });

 const AuthContext = createContext(null);

 export const AuthProvider = ({ children }) => {
 
    const [token, setToken] = useState(null);
  
    const handleLogin = async () => {
      const token = await fakeAuth();
        setToken(token);
    };
  
    const handleLogout = () => {
      setToken(null);
    };
  
    const value = {
      token,
      onLogin: handleLogin,
      onLogout: handleLogout,
    };
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => {
    return useContext(AuthContext);
  };