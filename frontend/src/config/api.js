import axios from 'axios';

// Get API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

console.log('🔗 API Base URL:', API_BASE_URL);

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// API Functions
export const api = {
  // Auth
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  refreshToken: (refreshToken) => apiClient.post('/auth/refresh', { refreshToken }),
  
  // Users
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data) => apiClient.patch('/users/profile', data),
  getUsers: () => apiClient.get('/users'),
  
  // Orders
  getOrders: (params) => apiClient.get('/orders', { params }),
  createOrder: (data) => apiClient.post('/orders', data),
  getOrder: (id) => apiClient.get(`/orders/${id}`),
  updateOrder: (id, data) => apiClient.patch(`/orders/${id}`, data),
  cancelOrder: (id) => apiClient.delete(`/orders/${id}`),
  
  // Drivers
  getDrivers: () => apiClient.get('/drivers'),
  createDriver: (data) => apiClient.post('/drivers', data),
  getDriver: (id) => apiClient.get(`/drivers/${id}`),
  updateDriver: (id, data) => apiClient.patch(`/drivers/${id}`, data),
  
  // Payments
  initiatePayment: (data) => apiClient.post('/payments/initiate', data),
  verifyPayment: (reference) => apiClient.post('/payments/verify', { reference }),
  getPayment: (id) => apiClient.get(`/payments/${id}`),
};
