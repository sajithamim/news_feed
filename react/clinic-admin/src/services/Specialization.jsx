import http from "../http-common";
import axios from 'axios';

const API_URL = "http://178.18.246.233:8000/";

const getAll = () => {
  return http.get("spec/specialization");
};

const  getAllSubSpec = (id) => {
  return http.get(`spec/specialization/${id}/spubspec_list`);
} 

const postSubSpec =(state) => {
  return axios
  .post(API_URL + "spec/subspecialization/", state)
      .then((response) => {
        return response.data;
      });
}
const Specialization = {
  getAll,
  getAllSubSpec,
  postSubSpec
};
  
export default Specialization;