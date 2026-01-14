export interface User {
  id: string;
  email: string;
  name?: string;
  [key: string]: unknown;
}

export interface AuthResponse {
  access_token?: string;
  refresh_token?: string;
  token?: string;
  user?: User;
  [key: string]: unknown;
}

export interface LoginPayload {
  email: string;
  password: string;
  [key: string]: unknown;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name?: string;
  [key: string]: unknown;
}

export interface TokenPayload {
  refreshToken: string;
  token?: string;
  [key: string]: unknown;
}
