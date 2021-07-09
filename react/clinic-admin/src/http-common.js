import axios from "axios";

const accessToken = localStorage.getItem('accessToken');

export const http = axios.create({
  baseURL: "http://178.18.246.233:8000/",
  headers: {
    "Content-type": "application/json",
    "Authorization":  `Bearer ${accessToken}`
  }
});

export const instance = axios.create({
  baseURL: "http://178.18.246.233:8000/",
  headers: { "Content-Type": "multipart/form-data" },
});