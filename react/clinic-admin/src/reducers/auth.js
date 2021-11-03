import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  POST_EMAIL,
  PASSWORD_RESET,
  POST_EMAIL_ERROR
} from "../actions/type";

const initialState = {
  isLoggedIn: false,
  refreshToken: "",
  accessToken: "",
  success: "",
  error: null,
  requestEmail: "",
  passwordSet: ""
}


export default function (state = initialState, action) {
  console.log("success", action);
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
    case POST_EMAIL:
      return { ...state,  success: action.payload.success};
    case POST_EMAIL_ERROR:
      return { ...state,  error: action.error};
    case PASSWORD_RESET:
      return { ...state, passwordSet: action.payload };
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