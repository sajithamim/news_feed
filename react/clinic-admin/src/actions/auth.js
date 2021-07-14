import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./type";

import AuthService from "../services/auth.service";

export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(

    (res) => {
      localStorage.setItem("refreshToken", res.data.tokens.refresh);
      localStorage.setItem("accessToken", res.data.tokens.access);
      localStorage.setItem("success", res.data.success);
      dispatch({
        type: LOGIN_SUCCESS,
        refreshToken: res.data.tokens.refresh,
        accessToken: res.data.tokens.access,
        success: res.data.success
      });
    },
    (error) => {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.detail
      });
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};