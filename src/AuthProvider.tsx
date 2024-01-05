 import { useState, useContext, createContext } from 'react';
 
export interface IAuthToken {
  id:string;
  name:string,
  permissions:string[];
  roles:string[];
}

export interface IAuthProvider {
  token:IAuthToken|null;
  onLogin(): any;
  onLogout(): any;
}

 const fakeAuth = (): Promise<IAuthToken> =>
    new Promise<IAuthToken>((resolve) => {
    setTimeout(() => resolve({ 
        id: '1',
        name: 'Steve Green',
        permissions: ['analyze'],
        roles: ['admin'],
      }), 2500);
 });
 
 const AuthContext = createContext<IAuthProvider|null>(null);

 export const AuthProvider = ({ children }:any) => {
     
    const [token, setToken] = useState<IAuthToken|null>(null);
  
    const handleLogin = async () => {
      const token = await fakeAuth();
        setToken(token);
    };
  
    const handleLogout = () => {
      setToken(null);
    };
  
    const value :IAuthProvider= {
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

  export const useAuth = (): IAuthProvider|null => {
    return useContext(AuthContext);
  };