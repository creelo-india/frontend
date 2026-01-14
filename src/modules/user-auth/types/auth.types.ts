export interface User {
  id: string;
  email: string;
  name?: string;
  [key: string]: unknown;
}

export interface LoginRequest {
  email: string;
  password: string;
  [key: string]: unknown;
}

export interface LoginResponse {
  access_token?: string;
  refresh_token?: string;
  token?: string;
  user?: User;
  [key: string]: unknown;
}
