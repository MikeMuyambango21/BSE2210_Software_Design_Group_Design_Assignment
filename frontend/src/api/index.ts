import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (data: { email: string; password: string; name?: string }) => {
    const response = await api.post('/api/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/api/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getMe: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};

// Events API
export const eventsAPI = {
  getAll: async (page = 1, limit = 10, search = '') => {
    const response = await api.get(`/api/events?page=${page}&limit=${limit}&search=${search}`);
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/api/events/${id}`);
    return response.data;
  },

  create: async (data: { title: string; description: string; date: Date; location: string }) => {
    const response = await api.post('/api/events', data);
    return response.data;
  },

  update: async (
    id: number,
    data: { title?: string; description?: string; date?: Date; location?: string }
  ) => {
    const response = await api.put(`/api/events/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/api/events/${id}`);
    return response.data;
  },
};

// Bookings API
export const bookingsAPI = {
  getAll: async () => {
    const response = await api.get('/api/bookings');
    return response.data;
  },

  create: async (data: { eventId: number; status?: string }) => {
    const response = await api.post('/api/bookings', data);
    return response.data;
  },

  update: async (id: number, status: string) => {
    const response = await api.put(`/api/bookings/${id}`, { status });
    return response.data;
  },

  cancel: async (id: number) => {
    const response = await api.delete(`/api/bookings/${id}`);
    return response.data;
  },
};

export default api;