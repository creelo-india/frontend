import { LOGIN_STATE_DATA } from "../constant";

const initialState = {
  loginState: false
};

export const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOGIN_STATE_DATA:
      return {
        ...state,
        loginState: action.payload,
      };
    default:
      return state;
  }
};
