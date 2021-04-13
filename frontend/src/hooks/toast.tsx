import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 } from 'uuid';
import ToastContainer from '../components/ToastContainer';
import { ToastMessages } from '../InterfaceModels/ToastMessages';

interface ToastContextData {
  addToast(message: Omit<ToastMessages, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessages[]>([]);

  const addToast = useCallback(({ title, description, type }: Omit<ToastMessages, 'id'>) => {
    const id = v4();
    const toast = {
      id,
      title,
      description,
      type,
    };

    setMessages(state => [...state, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

const useToast = (): ToastContextData => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used whhithin a ToastProvider');
  }

  return context;
};

export { ToastProvider, useToast };
