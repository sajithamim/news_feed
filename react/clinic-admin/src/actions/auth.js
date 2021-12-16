import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  POST_EMAIL,
  POST_EMAIL_ERROR
} from "./type";

import AuthService from "../services/auth.service";

export const login = (state) => (dispatch) => {
  return AuthService.login(state.email, state.password)
  .then(
    (res) => {
      console.log("response", res);
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
      console.log("error", error);
      dispatch({
        type: LOGIN_FAIL,
        error: "Network Error",
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
      if(res){
        dispatch({
          type: POST_EMAIL,
          payload: res.data,
      })
      }else{
        dispatch({
          type: POST_EMAIL_ERROR,
      })
      }
  } catch (err) {
    dispatch({
      type: POST_EMAIL_ERROR,
  })
  }
}

export const passwordReset = (state) => async (dispatch) => {
  try{
    const res = await AuthService.passwordReset(state);
    dispatch({
      type: 'PASSWORD_RESET',
      payload: res.data,
    })
    return res;
  }catch(err) {
    return err;
  }
}