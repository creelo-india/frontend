import {  LOGIN_STATE_DATA } from "../constant";

export const loginStateAction = (data) => {
    return {
      type: LOGIN_STATE_DATA,
      payload: data,
    };
  };
  