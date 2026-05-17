import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

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
