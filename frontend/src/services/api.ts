import axios from 'axios';

/**
 * INSTÂNCIA DE COMUNICAÇÃO CORE_ENGINE
 * Define a base de conexão com o Django Ninja (v1)
 */
const api = axios.create({
  // Ajustado para bater exatamente no seu urls.py: path("api/v1/", api.urls)
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * INTERCEPTOR DE SEGURANÇA (GATEKEEPER)
 * Antes de cada requisição sair, verifica se existe um token no sistema local.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // O seu auth.py no backend espera o padrão Bearer
      config.headers.Authorization = `Bearer ${token}`;
      
      // Log de depuração silencioso no console
      // console.log("[CORE] Token_Injected_Successfully");
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * INTERCEPTOR DE RESPOSTA (DETECTOR DE QUEDA)
 * Se o backend retornar 401 (Não autorizado), limpa o sistema e pede novo login.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("[SECURITY] Session_Expired_or_Invalid. Clearing_Access...");
      localStorage.removeItem('token');
      // Opcional: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;