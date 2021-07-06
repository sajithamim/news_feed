import axios from 'axios';

const API_URL = "http://178.18.246.233:8000/";

const login = (email, password) => {
    return axios
      .post(API_URL + "auth/adminlogin/", { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

const logout = () => {
    localStorage.removeItem("user");
  }

  const AuthService = {
    login,
    logout
  };

  export default  AuthService;