import React, { createContext, useCallback, useContext, useState } from 'react';
import { SignIn } from '../InterfaceModels/SignIn';
import api from '../services/api';

interface AuthContextData {
  user: Record<string, unknown>;
  signIn(credentials: SignIn): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  user: Record<string, unknown>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, SetData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    return token && user ? { token, user: JSON.parse(user) } : ({} as AuthState);
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('users', {
      email,
      password,
    });

    const { token, user } = response.data;
    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    SetData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');
    SetData({} as AuthState);
  }, []);

  return <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used whhithin a AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
