import axios from 'axios';

/**
 * CORE_ENGINE_API_SERVICE
 * Centraliza a comunicação com o Backend Django Ninja (v1)
 */
const api = axios.create({
  // Bate exatamente no path("api/v1/", api.urls) do seu urls.py
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * REQUEST_INTERCEPTOR (GATEKEEPER)
 * Injeta o Token JWT em todas as requisições protegidas (POST, PUT, DELETE).
 * O auth_bearer do Ninja exige o prefixo "Bearer ".
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // IMPORTANTE: O espaço após 'Bearer' é obrigatório para o Django Ninja
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * RESPONSE_INTERCEPTOR (PROTOCOL_FAILURE_HANDLER)
 * Monitora se o token expirou ou se o servidor caiu.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se o backend retornar 401, o acesso foi negado ou o token expirou
    if (error.response && error.response.status === 401) {
      console.warn("[SECURITY_ALERT] Acesso negado. Limpando credenciais...");
      localStorage.removeItem('token');
      
      // Se não estiver na página de login, redireciona o usuário
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    // Tratamento de erros globais de rede
    if (!error.response) {
      console.error("[NETWORK_ERROR] O motor backend está offline.");
    }

    return Promise.reject(error);
  }
);

export default api;