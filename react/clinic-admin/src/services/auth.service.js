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

const logout = () => {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("success");
}

const AuthService = {
  login,
  logout
};

export default AuthService;
