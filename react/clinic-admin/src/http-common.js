import axios from "axios";

export const http = axios.create({
  baseURL: "http://178.18.246.233:8000/api/",
  headers: {
    "Content-type": "application/json", 
  }
});

export const instance = axios.create({
  baseURL: "http://178.18.246.233:8000/api/",
  headers: { 'content-type': 'multipart/form-data' },
});

http.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem("accessToken");
  config.headers["authorization"] = `Bearer ${accessToken}`;
  return config;
});