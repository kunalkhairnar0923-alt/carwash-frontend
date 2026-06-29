import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
};

// Services API
export const servicesAPI = {
  getAll: () => apiClient.get('/services'),
  getById: (id) => apiClient.get(`/services/${id}`),
};

// Bookings API
export const bookingsAPI = {
  create: (data) => apiClient.post('/bookings', data),
  getAll: () => apiClient.get('/bookings'),
  getById: (id) => apiClient.get(`/bookings/${id}`),
  update: (id, data) => apiClient.put(`/bookings/${id}`, data),
  cancel: (id) => apiClient.delete(`/bookings/${id}`),
};

// Admin API
export const adminAPI = {
  getStats: () => apiClient.get('/admin/dashboard/stats'),
  getAllBookings: () => apiClient.get('/admin/bookings/all'),
  getRevenueReport: () => apiClient.get('/admin/reports/revenue'),
  getPopularityReport: () => apiClient.get('/admin/reports/popularity'),
};

export default apiClient;
