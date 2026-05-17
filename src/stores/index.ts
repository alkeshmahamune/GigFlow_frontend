import { create } from 'zustand';

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

interface AuthStoreState {
  isAuthenticated: boolean;
  token: string | null;
  user: AuthUser | null;
  error: string | null;
  initializeAuth: () => void;
  setAuthData: (token: string, user: AuthUser) => void;
  setAuthenticated: (value: boolean) => void;
  setError: (value: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  isAuthenticated: false,
  token: null,
  user: null,
  error: null,
  initializeAuth: () => {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('auth_token') : null;
    const user = typeof window !== 'undefined' ? window.localStorage.getItem('auth_user') : null;

    set({
      isAuthenticated: !!token,
      token,
      user: user ? JSON.parse(user) : null,
    });
  },
  setAuthData: (token, user) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('auth_token', token);
      window.localStorage.setItem('auth_user', JSON.stringify(user));
    }
    set({ isAuthenticated: true, token, user });
  },
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setError: (value) => set({ error: value }),
  logout: () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('auth_token');
      window.localStorage.removeItem('auth_user');
    }
    set({ isAuthenticated: false, token: null, user: null });
  },
}));
