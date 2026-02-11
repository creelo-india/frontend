import axios from "axios";
import { CONFIG } from "./config"; 

// Create an Axios instance with dynamic base URL from config.js
const axiosClient = axios.create({
  baseURL: CONFIG.BASE_URL, 
  headers: {
    "Content-Type": "application/json", 
  },
})

// Request interceptor – attach JWT for protected routes
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor – surface errors to callers; optional global handling
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("storage"));
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
