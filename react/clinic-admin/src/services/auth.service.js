import { http} from "../http-common";
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
    .post(url, { state })
    .then((response) => {
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
  logout
};

export default AuthService;
