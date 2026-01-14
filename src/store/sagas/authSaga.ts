import { call, put, takeEvery } from "redux-saga/effects";
import api from "../../lib/api";
import { loginStart, loginSuccess, loginFailure } from "../slices/authSlice";

interface LoginAction {
  type: string;
  payload: {
    email: string;
    password: string;
  };
}

function* loginWorker(action: LoginAction) {
  try {
    const response = yield call(api.post, "/api/auth/login", {
      email: action.payload.email,
      password: action.payload.password,
    });

    const { access_token, token, user } = response.data;
    const authToken = access_token || token;

    if (authToken) {
      yield put(
        loginSuccess({
          user: user || { email: action.payload.email },
          token: authToken,
        })
      );
    } else {
      yield put(loginFailure("Invalid response from server"));
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Login failed. Please try again.";
    yield put(loginFailure(errorMessage));
  }
}

function* authSaga() {
  yield takeEvery(loginStart.type, loginWorker);
}

export default authSaga;
