'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole, getStoredUser, getStoredToken, setStoredAuth, clearStoredAuth } from '@/lib/auth';
import { loginApi, registerApi, getCurrentUserApi } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  register: (data: { name: string; email: string; password: string; role: UserRole; organizationName?: string }) => Promise<void>;
  setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRoleState] = useState<UserRole>('DONOR');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const initialUser = getStoredUser();
    const initialToken = getStoredToken();

    if (initialUser && initialToken) {
      setUser(initialUser);
      setRoleState(initialUser.role);
      setToken(initialToken);
      getCurrentUserApi().then(apiUser => {
        if (apiUser) {
          const updated: User = {
            id: apiUser.id,
            name: apiUser.name,
            email: apiUser.email,
            role: apiUser.role
          };
          setUser(updated);
          setRoleState(apiUser.role);
        }
      });
    } else {
      const defaultUser: User = {
        id: 'usr_donor_demo',
        name: 'Demo Donor',
        email: 'donor@ledgercare.org',
        role: 'DONOR'
      };
      setUser(defaultUser);
    }
  }, []);

  const login = async (email: string, password: string, selectedRole?: UserRole) => {
    try {
      const data = await loginApi(email, password);
      const loggedUser: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role
      };
      setUser(loggedUser);
      setRoleState(loggedUser.role);
      setToken(data.token);
      setStoredAuth(loggedUser, data.token);
    } catch (err) {
      console.warn('Real login failed, fallback to local session:', err);
      const fallbackRole = selectedRole || (email.includes('hope') || email.includes('charity') ? 'CHARITY' : 'DONOR');
      const fallbackUser: User = {
        id: fallbackRole === 'CHARITY' ? 'CH001' : 'usr_donor_demo',
        name: fallbackRole === 'CHARITY' ? 'Hope Foundation' : 'Demo Donor',
        email,
        role: fallbackRole
      };
      const mockToken = `mock_token_${Date.now()}`;
      setUser(fallbackUser);
      setRoleState(fallbackRole);
      setToken(mockToken);
      setStoredAuth(fallbackUser, mockToken);
    }
  };

  const register = async (data: { name: string; email: string; password: string; role: UserRole; organizationName?: string }) => {
    try {
      const regData = await registerApi({
        name: data.name || data.organizationName || 'New User',
        email: data.email,
        password: data.password,
        role: data.role
      });
      const registeredUser: User = {
        id: regData.user.id,
        name: regData.user.name,
        email: regData.user.email,
        role: regData.user.role,
        organizationName: data.organizationName
      };
      setUser(registeredUser);
      setRoleState(registeredUser.role);
      setToken(regData.token);
      setStoredAuth(registeredUser, regData.token);
    } catch (err) {
      console.warn('Real register failed, fallback to local session:', err);
      const fallbackUser: User = {
        id: data.role === 'CHARITY' ? 'CH006' : `usr_${Date.now()}`,
        name: data.name || data.organizationName || 'Registered User',
        email: data.email,
        role: data.role,
        organizationName: data.organizationName
      };
      const mockToken = `mock_token_${Date.now()}`;
      setUser(fallbackUser);
      setRoleState(data.role);
      setToken(mockToken);
      setStoredAuth(fallbackUser, mockToken);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearStoredAuth();
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (user) {
      const updated = { ...user, role: newRole };
      setUser(updated);
      setStoredAuth(updated, token || 'mock_token');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        setRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
