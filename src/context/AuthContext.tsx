import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

interface User {
  id: string;
  displayName: string;
  email: string;
  photoURL?: string;
  isGuest?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>; // we'll implement with Passport or just remove
  loginAsGuest: (name: string, email: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const loginAsGuest = async (name: string, email: string) => {
    try {
      const res = await api.post('/auth/guest', { displayName: name, email });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error('Guest login error:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    // You can implement OAuth with Passport later, or keep Firebase just for Google auth
    // For now, you can either remove this button or use a separate library.
    // Option: use a simple email/password login instead.
    alert('Google login is not implemented yet. Use guest or email/password.');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        loginAsGuest,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};