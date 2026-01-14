import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

/**
 * Internal API client for Next.js API routes
 * These routes handle caching and proxy to external APIs
 * Automatically forwards cookies from incoming requests
 */
const apiInternal = axios.create({
  baseURL: "", // Relative URLs for Next.js API routes
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach auth token and forward cookies
apiInternal.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Forward cookies from Next.js request (server-side)
    if (typeof window === "undefined") {
      try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore
          .getAll()
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join("; ");

        if (cookieHeader && config.headers) {
          config.headers.Cookie = cookieHeader;
        }

        // Also attach access token if available
        const accessToken = cookieStore.get("accessToken");
        if (accessToken?.value && config.headers) {
          config.headers.Authorization = `Bearer ${accessToken.value}`;
        }
      } catch (error) {
        // cookies() may not be available in all contexts
        console.warn("Could not access cookies in apiInternal interceptor");
      }
    } else {
      // Client-side: use token from cookies via helper
      const { getAccessToken } = await import("./authTokens");
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
apiInternal.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Client-side: remove token and redirect
        const { removeAccessToken } = await import("./authTokens");
        removeAccessToken();

        // Clear any Redux auth state if needed
        if (window.dispatchEvent) {
          window.dispatchEvent(new Event("auth:logout"));
        }

        // Redirect to login
        window.location.href = "/login";
      } else {
        // Server-side: remove access token cookie
        try {
          const cookieStore = await cookies();
          cookieStore.delete("accessToken");
        } catch (error) {
          console.warn("Could not remove access token cookie on server");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiInternal;
