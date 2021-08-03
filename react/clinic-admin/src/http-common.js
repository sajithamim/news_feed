import axios from "axios";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json",
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
