import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json",
  }
});
http.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem("accessToken");
  config.headers["authorization"] = `Bearer ${accessToken}`;
  return config;
});
//............................................................................
export const http1 = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Authorization": accessToken,
  }
});
http1.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem("accessToken");
  config.headers["authorization"] = `Bearer ${accessToken}`;
  return config;
});

// ............................................................................
export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'content-type': 'multipart/form-data' },
});


instance.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem("accessToken");
  config.headers["authorization"] = `Bearer ${accessToken}`;
  return config;
});

// ............................................................................

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
      (status === 401 || status === 403 || status === 415) ||
      !originalRequest._retry
    ) {
      let token = await refresh();
      if (token === undefined) {
        sessionlogout();
      }
      originalRequest._retry = true;
      originalRequest.headers.authorization = `Bearer ${token.data.access}`;
      localStorage.setItem("accessToken", token.data.access);
      return instance(originalRequest);
    }
    else{
      console.log("error");
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
      (status === 401 || status === 403) &&
      !originalRequest._retry
    ) {
      let token = await refresh();
      if (token === undefined) {
        sessionlogout();
      }
      originalRequest._retry = true;
      originalRequest.headers.authorization = `Bearer ${token.data.access}`;
      localStorage.setItem("accessToken", token.data.access);
      return http(originalRequest);
    }
    else{
      console.log("error");
    }
    return Promise.reject(error);
  }
);

http1.interceptors.response.use(
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
      !originalRequest._retry
    ) {
      let token = await refresh();
      if (token === undefined) {
        sessionlogout();
      }
      originalRequest._retry = true;
      originalRequest.headers.authorization = `Bearer ${token.data.access}`;
      localStorage.setItem("accessToken", token.data.access);
      return http1(originalRequest);
    }
    else{
      console.log("error");
    }
    return Promise.reject(error);
  }
);

export const refresh = async () => {
  let refreshToken = localStorage.getItem("refreshToken");
  let accessToken = localStorage.getItem("accessToken");
  if (refreshToken && accessToken) {
    let url = `${process.env.REACT_APP_API_URL}auth/token/refresh/`;
    return axios.post(url,
      { refresh: refreshToken },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
      .then((res) => {
        return res;
      }).catch((err) => {
        const clearToken = localStorage.clear();
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
      });
  }
};

export const sessionlogout = () => {
  const clearToken = localStorage.clear();
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
}