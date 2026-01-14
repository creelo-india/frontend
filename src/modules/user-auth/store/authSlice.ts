import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { login as loginApi } from "../services/authApi";
import type { User, LoginResponse } from "../types/auth.types";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

interface LoginCredentials {
  email: string;
  password: string;
}

export const login = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginApi(credentials.email, credentials.password);
    return response;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Login failed. Please try again.";
    return rejectWithValue(errorMessage);
  }
});

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        const { access_token, token, user } = action.payload;
        const authToken = access_token || token;

        if (authToken && user) {
          state.token = authToken;
          state.user = user;
          state.isAuthenticated = true;
          state.error = null;
        } else {
          state.error = "Invalid response from server";
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
