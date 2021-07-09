import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../actions/type";
  
  const initialState = {
    isLoggedIn: false,
    refreshToken: "",
    accessToken: "",
    success: "",
    error: {},
  }
  // const user = JSON.parse(localStorage.getItem("user"));
  // const initialState = user
  //   ? { isLoggedIn: true, user, userErr: null }
  //   : { isLoggedIn: false, user: null, userErr: null };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    console.log('payload', payload)
    switch (type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          refreshToken: action.refreshToken,
          accessToken: action.accessToken,
          success: action.success,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          error: action.payload,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      default:
        return state;
    }
  }