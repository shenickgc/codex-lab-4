import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  clearSession,
  getSession,
  loginRequest,
  registerRequest,
  saveSession
} from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => getSession());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await loginRequest(credentials);
    saveSession(data);
    setSession(data);
    return data;
  };

  const register = async (payload) => {
    const data = await registerRequest(payload);
    saveSession(data);
    setSession(data);
    return data;
  };

  const logout = () => {
    clearSession();
    setSession(null);
  };

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: Boolean(session?.token),
      isLoading,
      login,
      register,
      logout
    }),
    [isLoading, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
