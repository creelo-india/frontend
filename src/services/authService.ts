import api from "../lib/api";

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const response = await api.post("/api/auth/login", payload);
  return response.data;
};
