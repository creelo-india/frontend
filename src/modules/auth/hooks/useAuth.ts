import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  setUser,
} from "../store/authSlice";
import type { User } from "../types/auth.types";

export function useAuth() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  return {
    // State
    user: authState.user,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    loading: authState.loading,
    error: authState.error,

    // Actions
    loginRequest: () => dispatch(loginRequest()),
    loginSuccess: (payload: { user: User; token: string }) =>
      dispatch(loginSuccess(payload)),
    loginFailure: (error: string) => dispatch(loginFailure(error)),
    logout: () => dispatch(logout()),
    setUser: (user: User | null) => dispatch(setUser(user)),
  };
}
