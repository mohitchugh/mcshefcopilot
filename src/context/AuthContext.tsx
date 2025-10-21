import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  setUserRole: (role: 'chef' | 'customer') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user: auth0User, isAuthenticated, isLoading: auth0Loading, loginWithRedirect, logout: auth0Logout } = useAuth0();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && auth0User) {
      // Check localStorage for role, default to customer
      const role = (localStorage.getItem('userRole') as 'chef' | 'customer') || 'customer';
      
      setUser({
        id: auth0User.sub || '',
        email: auth0User.email || '',
        name: auth0User.name || '',
        role,
      });
      setIsLoading(false);
    } else {
      setUser(null);
      setIsLoading(auth0Loading);
    }
  }, [isAuthenticated, auth0User, auth0Loading]);

  const login = () => {
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
      },
    });
  };

  const logout = () => {
    localStorage.removeItem('userRole');
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const setUserRole = (role: 'chef' | 'customer') => {
    localStorage.setItem('userRole', role);
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        setUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
