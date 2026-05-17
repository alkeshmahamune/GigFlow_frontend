import { create } from 'zustand';

interface AuthStoreState {
  isAuthenticated: boolean;
  error: string | null;
  initializeAuth: () => void;
  setAuthenticated: (value: boolean) => void;
  setError: (value: string | null) => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  isAuthenticated: false,
  error: null,
  initializeAuth: () => {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('auth_token') : null;
    set({ isAuthenticated: !!token });
  },
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setError: (value) => set({ error: value }),
}));
