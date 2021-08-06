import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  POST_EMAIL,
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

export const postRequestEmail = (state) => async (dispatch) => {
  try {
      const res = await AuthService.postEmail(state);
      console.log("response" , res);
      dispatch({
          type: POST_EMAIL,
          payload: res.data,
      })
  } catch (err) {
      console.log(err);
  }
}