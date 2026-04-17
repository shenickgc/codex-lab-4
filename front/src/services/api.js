import axios from 'axios';

const storageKey = 'auth_session';

export const api = axios.create({
  baseURL: '/api'
});

api.interceptors.request.use((config) => {
  const session = localStorage.getItem(storageKey);

  if (session) {
    const parsed = JSON.parse(session);
    if (parsed?.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
  }

  return config;
});

export function getSession() {
  const session = localStorage.getItem(storageKey);
  return session ? JSON.parse(session) : null;
}

export function saveSession(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

export function clearSession() {
  localStorage.removeItem(storageKey);
}

export async function loginRequest(payload) {
  const response = await api.post('/auth/login', payload);
  return response.data.data;
}

export async function registerRequest(payload) {
  const response = await api.post('/auth/register', payload);
  return response.data.data;
}

export async function listUsersRequest() {
  const response = await api.get('/users');
  return response.data.data;
}

export async function createUserRequest(payload) {
  const response = await api.post('/users', payload);
  return response.data.data;
}

export async function updateUserRequest(id, payload) {
  const response = await api.put(`/users/${id}`, payload);
  return response.data.data;
}

export async function deleteUserRequest(id) {
  const response = await api.delete(`/users/${id}`);
  return response.data.data;
}
