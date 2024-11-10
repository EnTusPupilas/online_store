import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData: { email: string; password: string; name: string }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

export const productsApi = {
  getAll: async (params?: { search?: string; category?: string }) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  create: async (productData: FormData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },
  update: async (id: string, productData: FormData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/products/${id}`);
  },
};

export const ordersApi = {
  create: async (orderData: { products: { id: string; quantity: number }[] }) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};

export const adminApi = {
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
};
