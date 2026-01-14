import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getAccessToken, removeAccessToken } from "./authTokens";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach auth token from cookies
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 and auto-logout
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Remove token from cookies
        removeAccessToken();

        // Clear any Redux auth state if needed
        // Dispatch logout action if store is available
        if (window.dispatchEvent) {
          window.dispatchEvent(new Event("auth:logout"));
        }

        // Redirect to login
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
