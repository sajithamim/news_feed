import axios from "axios";

const access = localStorage.getItem("accessToken")

console.log('access', access)

export const http = axios.create({
  
  baseURL: "http://178.18.246.233:8000/api/",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${window.localStorage.getItem('accessToken')}`
    
  }
});

export const instance = axios.create({
  baseURL: "http://178.18.246.233:8000/api/",
  headers: { "Content-Type": "multipart/form-data"},
});