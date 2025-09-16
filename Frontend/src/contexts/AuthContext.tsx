import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: {
    url: string;
  };
  fullName: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for existing token and validate it
        const token = localStorage.getItem('authToken');
        if (token) {
          authService.setToken(token);
          const userData = await authService.getMe();
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        // Clear invalid auth data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Handle automatic navigation after login
  useEffect(() => {
    if (user && !loading) {
      const currentPath = window.location.hash.replace('#', '');
      const isOnAuthPage = currentPath === '/login' || currentPath === '/register';
      
      if (isOnAuthPage) {
        const dashboardPath = `/${user.role}/dashboard`;
        window.location.hash = dashboardPath;
      }
    }
  }, [user, loading]);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const userData = await authService.login({ email, password });
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any): Promise<void> => {
    try {
      setLoading(true);
      const newUser = await authService.register(userData);
      setUser(newUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      // Force logout even if API call fails
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
