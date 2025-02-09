import axios from "axios";

// Retrieve the token from local storage
// const BASE_URL = "http://localhost:3000/api/";
const BASE_URL = "https://crmbackend-production-cf0e.up.railway.app/api/";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true

// Add request interceptor
axiosInstance.interceptors.request.use(
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

export default axiosInstance;