import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, AuthState, User } from '../models/User';
import { AUTH_KEY, useStorage } from '../hooks/useStorage.hook';
import { getProfile } from '../services/User.service';
import { expired } from '../shared/utils/token';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [auth, setAuth] = useState<AuthState>({});
  const { store, restore, remove } = useStorage();

  useEffect(() => {
    loadAuth();
  }, []);

  const loadAuth = async () => {
    const storedAuth = await restore(AUTH_KEY);
    if (storedAuth && storedAuth.user && storedAuth.token && !expired(storedAuth.token)) {
      setAuth(storedAuth);
    } else {
      logout();
    }
  };

  const login = async (user: User, token: string) => {
    const auth = { user, token };
    await store(AUTH_KEY, auth)
    setAuth(auth);
  };

  const logout = async () => {
    remove(AUTH_KEY)
    setAuth({});
  };

  const loadProfile = async (token: string) => {
    const { email, firstName, lastName, avatar } = await getProfile(token)
    const user: User = { email, firstName, lastName, avatar };
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout, loadProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};