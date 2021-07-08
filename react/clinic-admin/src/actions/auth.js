import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./type";

  import AuthService from "../services/auth.service";

  export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
  
        return data;
      },
      (error) => {
        //console.log('error12....', error.response.data)
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.detail) ?
            error.response.data.detail : 
          error.toString();
  //console.log('message', message)
        dispatch({
          type: LOGIN_FAIL,
          payload: message
        });
        return message;
        //return Promise.reject();
      }
    );
  };

  export const logout = () => (dispatch) => {
    console.log("getting logout");
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };