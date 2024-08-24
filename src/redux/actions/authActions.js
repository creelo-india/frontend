// src/redux/actions/authActions.js
export const loginAction = (credentials) => {
  return {
    type: "LOGIN",
    payload: credentials,
  };
};
