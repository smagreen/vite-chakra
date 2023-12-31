 import { useState } from 'react';
 
 const fakeAuth = () =>
    new Promise((resolve) => {
    setTimeout(() => resolve({ 
        id: '1',
        name: 'Steve',
        permissions: ['analyze'],
        roles: ['admin'],
      }), 250);
 });

 export default AuthProvider = ({ children }) => {
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