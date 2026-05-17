import { useCallback, useMemo, useState } from 'react';
import { useAuthStore } from '@stores/index';
import type { CreateLeadRequest, Lead, RegisterCredentials } from '@app-types/index';

const initialLeads: Lead[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    status: 'New',
    source: 'Website',
    createdAt: new Date().toISOString(),
    updatedAt: null,
  },
];

export function useAuth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const login = useCallback(async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    clearError();

    await new Promise((resolve) => setTimeout(resolve, 400));

    if (credentials.email === 'admin@example.com' && credentials.password === 'password123') {
      window.localStorage.setItem('auth_token', 'demo-token');
      setAuthenticated(true);
    } else {
      setError('Invalid email or password.');
    }

    setIsLoading(false);
  }, [clearError, setAuthenticated]);

  const register = useCallback(async (data: RegisterCredentials) => {
    setIsLoading(true);
    clearError();

    await new Promise((resolve) => setTimeout(resolve, 400));

    window.localStorage.setItem('auth_token', 'demo-token');
    window.localStorage.setItem('auth_user', data.email);
    setAuthenticated(true);
    setIsLoading(false);
  }, [clearError, setAuthenticated]);

  return {
    login,
    register,
    isLoading,
    error,
    isAuthenticated,
    clearError,
  };
}

export function useTheme() {
  const theme = useMemo(() => ({ theme: 'light' as const }), []);
  return theme;
}

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ search: '', status: 'All' });
  const [page, setPage] = useState(1);

  const visibleLeads = useMemo(() => {
    return leads
      .filter((lead) =>
        filters.search
          ? [lead.name, lead.email, lead.status, lead.source]
              .join(' ')
              .toLowerCase()
              .includes(filters.search.toLowerCase())
          : true
      )
      .filter((lead) => (filters.status === 'All' ? true : lead.status === filters.status));
  }, [filters, leads]);

  const computedPagination = useMemo(
    () => ({
      page,
      totalPages: visibleLeads.length > 0 ? 1 : 1,
      totalRecords: visibleLeads.length,
    }),
    [page, visibleLeads.length]
  );

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsLoading(false);
  }, []);

  const createLead = useCallback(async (data: CreateLeadRequest) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setLeads((current) => [
      {
        id: `${Date.now()}`,
        name: data.name,
        email: data.email,
        status: data.status,
        source: data.source,
        createdAt: new Date().toISOString(),
        updatedAt: null,
      },
      ...current,
    ]);
    setIsLoading(false);
    return true;
  }, []);

  const updateLead = useCallback(async (id: string, data: CreateLeadRequest) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setLeads((current) =>
      current.map((lead) =>
        lead.id === id
          ? { ...lead, ...data, updatedAt: new Date().toISOString() }
          : lead
      )
    );
    setIsLoading(false);
    return true;
  }, []);

  const deleteLead = useCallback(async (id: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setLeads((current) => current.filter((lead) => lead.id !== id));
    setIsLoading(false);
    return true;
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ search: '', status: 'All' });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const setPageNumber = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  return {
    leads: visibleLeads,
    isLoading,
    error,
    pagination: computedPagination,
    filters,
    fetchLeads,
    createLead,
    updateLead,
    deleteLead,
    setFilters,
    setPage: setPageNumber,
    resetFilters,
    clearError,
  };
}

export { useDarkMode, DarkModeProvider } from './useDarkMode';
