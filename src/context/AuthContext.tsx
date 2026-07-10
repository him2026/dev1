import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DbUser } from '../types/database';
import { loginUser, registerUser } from '../services/api';

interface AuthContextData {
  user: DbUser | null;
  loading: boolean;
  login: (email: string, passwordRaw: string) => Promise<{ error: Error | null }>;
  register: (name: string, email: string, password: string, dob: string, cycleLength: number, lastPeriod: string) => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  updateUserContext: (updates: Partial<DbUser>) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      const userData = await AsyncStorage.getItem('@him_user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Failed to load user', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, passwordRaw: string) => {
    setLoading(true);
    const { user: loggedInUser, error } = await loginUser(email, passwordRaw);
    if (loggedInUser) {
      setUser(loggedInUser);
      await AsyncStorage.setItem('@him_user', JSON.stringify(loggedInUser));
    }
    setLoading(false);
    return { error };
  };

  const register = async (name: string, email: string, password: string, dob: string, cycleLength: number, lastPeriod: string) => {
    setLoading(true);
    const { user: newUser, error } = await registerUser(name, email, password, dob, cycleLength, lastPeriod);
    if (newUser) {
      setUser(newUser);
      await AsyncStorage.setItem('@him_user', JSON.stringify(newUser));
    }
    setLoading(false);
    return { error };
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('@him_user');
  };

  const updateUserContext = async (updates: Partial<DbUser>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      await AsyncStorage.setItem('@him_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUserContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
