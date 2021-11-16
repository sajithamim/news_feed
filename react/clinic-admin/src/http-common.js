import axios from "axios";
import { Redirect } from 'react-router-dom';

const accessToken = localStorage.getItem("accessToken");
export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json",
  }
});

export const http1 = axios.create({
  baseURL: process.env.REACT_APP_ECAPS_API,
  headers: {
    "Authorization": accessToken,
  }
});

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'content-type': 'multipart/form-data' },
});

http.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem("accessToken");
  config.headers["authorization"] = `Bearer ${accessToken}`;
  return config;
});

instance.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem("accessToken");
  config.headers["authorization"] = `Bearer ${accessToken}`;
  return config;
});

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const serverCallUrl = new URL(
      originalRequest.url,
      process.env.REACT_APP_API_URL
    );
    const status = error.response.status;
    if (
      (status === 401 || status === 403) &&
      !originalRequest._retry &&
      !serverCallUrl.pathname.includes("/auth")
    ) {
      let token = await refresh();
      originalRequest._retry = true;
      originalRequest.headers.authorization = `Bearer ${token.data.access}`;
      localStorage.setItem("accessToken", token.data.access);
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const serverCallUrl = new URL(
      originalRequest.url,
      process.env.REACT_APP_API_URL
    );

    const status = error.response.status;
    if (
      (status === 401 || status === 404) &&
      !originalRequest._retry &&
      !serverCallUrl.pathname.includes("/auth")
    ) {
      let token = await refresh();
      if (token === undefined) {
        return token;
      }
      originalRequest._retry = true;
      originalRequest.headers.authorization = `Bearer ${token.data.access}`;
      localStorage.setItem("accessToken", token.data.access);
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const refresh = async () => {
  let refreshToken = localStorage.getItem("refreshToken");
  let accessToken = localStorage.getItem("accessToken");
  if (refreshToken && accessToken) {
    let url = `${process.env.REACT_APP_API_URL}auth/token/refresh/`;
    axios.post(url,
      // `${process.env.REACT_APP_API_URL}auth/token/refresh/`,
      { refresh: refreshToken },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    ).then((res) => {
      console.log("resPonse", res);
    }).catch((err) => {
      console.log("resPonse err", err);
    });
  }
};

