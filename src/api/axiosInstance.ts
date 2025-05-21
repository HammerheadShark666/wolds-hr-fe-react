import axios from 'axios'; 
import { logout } from '../features/authentication/authenticationSlice'; 

const axiosInstance = axios.create({
  baseURL: window.env?.REACT_APP_API_URL,
});
  
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

      if (!(config.data instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
      }
    }
    return config;
  },
  (error) => Promise.reject(error) 
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { store } = await import('../app/store');
      store.dispatch(logout());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;