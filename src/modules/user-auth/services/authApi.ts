import api from "../../../lib/api";
import type { LoginRequest, LoginResponse } from "../types/auth.types";

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const payload: LoginRequest = {
    email,
    password,
  };

  const response = await api.post<LoginResponse>("/api/auth/login", payload);
  return response.data;
}
