import axios from "axios";

export const http = axios.create({
  baseURL: "http://178.18.246.233:8000/",
  headers: {
    "Content-type": "application/json"
  }
});

export const instance = axios.create({
  baseURL: "http://178.18.246.233:8000/",
  headers: { "Content-Type": "multipart/form-data" },
});