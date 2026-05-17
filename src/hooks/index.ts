import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuthStore } from '@stores/index';
import type { CreateLeadRequest, Lead, RegisterCredentials } from '@app-types/index';
import { loginRequest, registerRequest } from '@utils/auth';
import {
  createLeadRequest,
  deleteLeadRequest,
  getLeadsRequest,
  updateLeadRequest,
} from '@utils/leads';

export function useAuth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const setErrorState = useAuthStore((state) => state.setError);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
    setErrorState(null);
  }, [setErrorState]);

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      setIsLoading(true);
      clearError();

      try {
        const result = await loginRequest(credentials);
        setAuthData(result.data.token, result.data.user);
      } catch (err: any) {
        const message = err?.response?.data?.message || err?.message || 'Invalid email or password.';
        setError(message);
        setErrorState(message);
      } finally {
        setIsLoading(false);
      }
    },
    [clearError, setAuthData, setErrorState]
  );

  const register = useCallback(
    async (data: RegisterCredentials, role: string = 'sales') => {
      setIsLoading(true);
      clearError();

      try {
        const result = await registerRequest(data, role);
        setAuthData(result.data.token, result.data.user);
      } catch (err: any) {
        const message = err?.response?.data?.message || err?.message || 'Unable to register account.';
        setError(message);
        setErrorState(message);
      } finally {
        setIsLoading(false);
      }
    },
    [clearError, setAuthData, setErrorState]
  );

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
  const token = useAuthStore((state) => state.token);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ search: '', status: 'All', source: 'All', sort: 'latest' });
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalRecords: 0 });

  const fetchLeads = useCallback(async () => {
    if (!token) {
      setError('Authentication required. Please log in.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const params: Record<string, unknown> = { page, sort: filters.sort };
      if (filters.status && filters.status !== 'All') {
        params.status = filters.status;
      }
      if (filters.source && filters.source !== 'All') {
        params.source = filters.source;
      }
      if (filters.search) {
        params.search = filters.search;
      }

      const result = await getLeadsRequest(token, params);
      const mappedLeads = result.data.leads.map((lead) => ({
        id: lead._id,
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source,
        createdAt: lead.createdAt,
        updatedAt: lead.updatedAt,
      }));

      setLeads(mappedLeads);
      setPagination({
        page: result.data.pagination.page,
        totalPages: result.data.pagination.pages,
        totalRecords: result.data.pagination.total,
      });
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || 'Unable to load leads.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [filters, page, token]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const createLead = useCallback(
    async (data: CreateLeadRequest) => {
      if (!token) {
        setError('Authentication required. Please log in.');
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        await createLeadRequest(token, data);
        await fetchLeads();
        return true;
      } catch (err: any) {
        const message = err?.response?.data?.message || err?.message || 'Unable to create lead.';
        setError(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchLeads, token]
  );

  const updateLead = useCallback(
    async (id: string, data: CreateLeadRequest) => {
      if (!token) {
        setError('Authentication required. Please log in.');
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        await updateLeadRequest(token, id, data);
        await fetchLeads();
        return true;
      } catch (err: any) {
        const message = err?.response?.data?.message || err?.message || 'Unable to update lead.';
        setError(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchLeads, token]
  );

  const deleteLead = useCallback(
    async (id: string) => {
      if (!token) {
        setError('Authentication required. Please log in.');
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        await deleteLeadRequest(token, id);
        await fetchLeads();
        return true;
      } catch (err: any) {
        const message = err?.response?.data?.message || err?.message || 'Unable to delete lead.';
        setError(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchLeads, token]
  );

  const resetFilters = useCallback(() => {
    setFilters({ search: '', status: 'All', source: 'All', sort: 'latest' });
    setPage(1);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const setPageNumber = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const updateFilters = useCallback(
    (nextFilters: { search: string; status: string; source: string; sort: string }) => {
      setFilters(nextFilters);
      setPage(1);
    },
    []
  );

  const visibleLeads = useMemo(() => leads, [leads]);

  return {
    leads: visibleLeads,
    isLoading,
    error,
    pagination,
    filters,
    fetchLeads,
    createLead,
    updateLead,
    deleteLead,
    setFilters: updateFilters,
    setPage: setPageNumber,
    resetFilters,
    clearError,
  };
}

export { useDarkMode, DarkModeProvider } from './useDarkMode';
