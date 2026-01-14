import api from "../lib/api";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
  [key: string]: unknown;
}

interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  user?: unknown;
}

interface ProfileResponse {
  id: string;
  email: string;
  [key: string]: unknown;
}

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post("/accounts/user-sign/", payload);
    return response.data;
  },

  register: async (payload: RegisterPayload): Promise<LoginResponse> => {
    const response = await api.post("/accounts/register/", payload);
    return response.data;
  },

  getProfile: async (): Promise<ProfileResponse> => {
    const response = await api.get("/accounts/profile/");
    return response.data;
  },
};

export default authService;
