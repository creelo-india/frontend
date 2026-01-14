import axios, { AxiosInstance } from "axios";

// Base URL derived from environment configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export interface LoginPayload {
  email: string;
  password: string;
  [key: string]: unknown;
}

export interface RegisterPayload {
  email: string;
  password: string;
  [key: string]: unknown;
}

export interface RefreshTokenPayload {
  refreshToken: string;
  [key: string]: unknown;
}

export interface LogoutPayload {
  [key: string]: unknown;
}

export interface AuthResponse<T = unknown> {
  data: T;
}

// Dedicated Axios instance for auth-related requests
const authClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = {
  /**
   * Login user
   * @param endpoint Auth login endpoint (relative path, e.g. `/api/auth/login`)
   * @param payload  Login payload
   */
  login<TResponse = unknown>(
    endpoint: string,
    payload: LoginPayload
  ): Promise<AuthResponse<TResponse>> {
    return authClient.post<TResponse>(endpoint, payload).then((res) => ({
      data: res.data,
    }));
  },

  /**
   * Register user
   * @param endpoint Auth registration endpoint
   * @param payload  Registration payload
   */
  register<TResponse = unknown>(
    endpoint: string,
    payload: RegisterPayload
  ): Promise<AuthResponse<TResponse>> {
    return authClient.post<TResponse>(endpoint, payload).then((res) => ({
      data: res.data,
    }));
  },

  /**
   * Refresh auth token
   * @param endpoint Refresh token endpoint
   * @param payload  Refresh token payload
   */
  refreshToken<TResponse = unknown>(
    endpoint: string,
    payload: RefreshTokenPayload
  ): Promise<AuthResponse<TResponse>> {
    return authClient.post<TResponse>(endpoint, payload).then((res) => ({
      data: res.data,
    }));
  },

  /**
   * Logout user
   * @param endpoint Logout endpoint
   * @param payload  Optional logout payload
   */
  logout<TResponse = unknown>(
    endpoint: string,
    payload?: LogoutPayload
  ): Promise<AuthResponse<TResponse>> {
    return authClient
      .post<TResponse>(endpoint, payload ?? {})
      .then((res) => ({ data: res.data }));
  },
};

export default authApi;

