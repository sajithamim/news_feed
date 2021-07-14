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
    error: null,
  }
 
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
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