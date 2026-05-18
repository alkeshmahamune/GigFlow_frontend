import api from './api';
import type { AuthCredentials, RegisterCredentials } from '@app-types/index';

export interface AuthResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    token: string;
  };
}

export async function loginRequest(credentials: AuthCredentials) {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data;
}

export async function registerRequest(
  payload: RegisterCredentials,
  role: string = 'sales'
) {
  const response = await api.post<AuthResponse>(
    '/auth/register',
    { ...payload, role }
  );

  return response.data;
}