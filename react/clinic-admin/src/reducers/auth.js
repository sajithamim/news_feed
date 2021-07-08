import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../actions/type";
  
  const user = JSON.parse(localStorage.getItem("user"));
  const initialState = user
    ? { isLoggedIn: true, user, userErr: null }
    : { isLoggedIn: false, user: null, userErr: null };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    console.log('payload', payload)
    switch (type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
          userErr: null
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          userErr: payload,
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