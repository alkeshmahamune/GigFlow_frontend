import axios from 'axios';

function normalizeApiUrl(url: string) {
  const trimmed = url.trim().replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
}

const rawApiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';
const API_URL = normalizeApiUrl(rawApiUrl);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function authHeader(token?: string) {
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}

export default api;
