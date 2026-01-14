import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { login, logout } from "../store/authSlice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.userAuth);

  return {
    // State
    user: authState.user,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    loading: authState.loading,
    error: authState.error,

    // Actions
    login: (email: string, password: string) =>
      dispatch(login({ email, password })),
    logout: () => dispatch(logout()),
  };
}
