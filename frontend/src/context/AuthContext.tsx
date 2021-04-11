import React, { createContext, useCallback, useState } from 'react';
import { SignInInterface } from '../InterfaceModels/SignIn-Interface';
import api from '../services/api';

interface AuthContextData {
  user: Record<string, unknown>;
  signIn(credentials: SignInInterface): Promise<void>;
}

interface AuthState {
  token: string;
  user: Record<string, unknown>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
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

  return <AuthContext.Provider value={{ user: data.user, signIn }}>{children}</AuthContext.Provider>;
};
