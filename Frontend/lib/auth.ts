export type UserRole = 'DONOR' | 'CHARITY';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationName?: string;
}

export const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('ledgercare_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('ledgercare_token');
};

export const setStoredAuth = (user: User, token: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('ledgercare_user', JSON.stringify(user));
  localStorage.setItem('ledgercare_token', token);
};

export const clearStoredAuth = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('ledgercare_user');
  localStorage.removeItem('ledgercare_token');
};
