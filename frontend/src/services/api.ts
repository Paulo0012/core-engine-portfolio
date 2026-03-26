import axios from 'axios';

// Instância centralizada do motor de conexão
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  timeout: 5000, // Evita que o sistema trave se o Django estiver offline
});

// Interceptor: Injeta o Token JWT em todas as requisições para o Dashboard
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;