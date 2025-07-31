import axios from 'axios';
import { logout, refreshToken } from '../features/authentication/authenticationThunk'; //

const axiosInstance = axios.create({
  baseURL: window.env?.REACT_APP_API_URL,
  withCredentials: true,
});

async function logoutOfApplication() {
  const { store } = await import('../app/store');
  store.dispatch(logout());
  window.location.href = '/login';
}
  
axiosInstance.interceptors.request.use(
  (config) => {  
      if (!(config.data instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
      } 
    return config;
  },
  (error) => Promise.reject(error) 
); 
  
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const isRefreshRequest = originalRequest?.url?.includes('/refresh-token');
    const isUnauthorized = error.response?.status === 401 || error.response?.status === 403;

    if (isUnauthorized && !originalRequest._retry && !isRefreshRequest) {
      originalRequest._retry = true;

      try {
        const { store } = await import('../app/store');
        await store.dispatch(refreshToken()).unwrap();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        logoutOfApplication();
        return Promise.reject(refreshError);
      }
    }

    if (isRefreshRequest) {
      logoutOfApplication();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;