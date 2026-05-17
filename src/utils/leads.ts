import api, { authHeader } from './api';
import type { CreateLeadRequest, UpdateLeadRequest } from '@app-types/index';

export interface LeadResponse {
  success: boolean;
  data: {
    lead: {
      _id: string;
      name: string;
      email: string;
      status: string;
      source: string;
      createdAt: string;
      updatedAt: string | null;
    };
  };
}

export interface LeadsListResponse {
  success: boolean;
  data: {
    leads: Array<{
      _id: string;
      name: string;
      email: string;
      status: string;
      source: string;
      createdAt: string;
      updatedAt: string | null;
    }>;
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

export async function getLeadsRequest(token: string, params: Record<string, unknown>) {
  const response = await api.get<LeadsListResponse>('/leads', {
    params,
    headers: authHeader(token),
  });
  return response.data;
}

export async function createLeadRequest(token: string, body: CreateLeadRequest) {
  const response = await api.post<LeadResponse>('/leads', body, {
    headers: authHeader(token),
  });
  return response.data;
}

export async function updateLeadRequest(token: string, id: string, body: UpdateLeadRequest) {
  const response = await api.put<LeadResponse>(`/leads/${id}`, body, {
    headers: authHeader(token),
  });
  return response.data;
}

export async function deleteLeadRequest(token: string, id: string) {
  const response = await api.delete<{ success: boolean; data: { message: string } }>(`/leads/${id}`, {
    headers: authHeader(token),
  });
  return response.data;
}
