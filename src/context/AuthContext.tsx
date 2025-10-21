import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useOktaAuth } from '@okta/okta-react';
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
  const { oktaAuth, authState } = useOktaAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authState?.isAuthenticated) {
      oktaAuth.getUser().then((userInfo) => {
        // Check localStorage for role, default to customer
        const role = (localStorage.getItem('userRole') as 'chef' | 'customer') || 'customer';
        
        setUser({
          id: userInfo.sub || '',
          email: userInfo.email || '',
          name: userInfo.name || '',
          role,
        });
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
      });
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, [authState, oktaAuth]);

  const login = () => {
    oktaAuth.signInWithRedirect();
  };

  const logout = () => {
    localStorage.removeItem('userRole');
    oktaAuth.signOut();
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
        isAuthenticated: !!authState?.isAuthenticated,
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
