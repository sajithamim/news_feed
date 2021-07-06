import axios from "axios";

export default axios.create({
  baseURL: "http://178.18.246.233:8000/",
  headers: {
    "Content-type": "application/json"
  }
});