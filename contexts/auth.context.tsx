import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, AuthState, User } from '../models/User';
import { useStorage } from '../hooks/useStorage.hook';
import { getProfile } from '../services/User.service';
import { expired } from '../shared/utils/token';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [auth, setAuth] = useState<AuthState>({});
  const { store, storeObject, restore, restoreObject, remove } = useStorage();

  useEffect(() => {
    const loadAuth = async () => {
      const token = await restore('token');
      const user = await restoreObject('user');
      if (user && token && !expired(token)) {
        setAuth({ token, user });
      } else {
        logout();
      }
    };
    loadAuth();
  }, []);

  const login = async (user: User, token: string) => {
    await store('token', token)
    await storeObject('user', user)
    setAuth({ user, token });
  };

  const logout = async () => {
    remove('token')
    remove('user')
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