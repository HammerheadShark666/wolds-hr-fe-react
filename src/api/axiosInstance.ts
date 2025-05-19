import axios from 'axios';

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

export default axiosInstance;