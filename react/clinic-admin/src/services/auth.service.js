import { http1, instance} from "../http-common";
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const login = (email, password) => {
  let url = `${process.env.REACT_APP_API_URL}auth/adminlogin/`;
  return axios
    .post(url, { email, password })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
}

const postEmail = (state) => {
  let url = `${process.env.REACT_APP_API_URL}auth/request-reset-email/`;
  return axios
    .post(url, state)
    .then((response) => {
      if (response.data)
      return response
    });
}

const passwordReset =(state) => {
  let url = `${process.env.REACT_APP_API_URL}auth/password-reset-complete/`;
  return axios
    .patch(url, state)
    .then((response) => {
      if (response.data)
      return response
    });
}


const logout = () => {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("success");
}

const AuthService = {
  login,
  postEmail,
  logout,
  passwordReset
};

export default AuthService;
