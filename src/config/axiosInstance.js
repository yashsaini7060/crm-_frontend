import axios from "axios";

// Retrieve the token from local storage
const token = localStorage.getItem('token');
const BASE_URL = "http://localhost:3000/api/";
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export default axiosInstance;