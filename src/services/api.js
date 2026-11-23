import axios from 'axios';

// Base API client configured for future Flask backend integration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Request interceptor to attach auth token if available in the future
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tracenet_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Graceful error handling for backend unavailable
    if (error.code === 'ERR_NETWORK' || !error.response) {
      console.warn('[TraceNet Service] Flask Backend not reachable, using fallback synthetic provider.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { API_BASE_URL };
