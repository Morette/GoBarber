import React, { createContext, useCallback } from 'react';
import { SignInInterface } from '../InterfaceModels/SignInInterface';
import api from '../services/api';

interface AuthContextData {
  name: string;
  signIn(credentials: SignInInterface): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('users', {
      email,
      password,
    });

    console.log(response.data);
  }, []);

  return <AuthContext.Provider value={{ name: 'Thiago', signIn }}>{children}</AuthContext.Provider>;
};
