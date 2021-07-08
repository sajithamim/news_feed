import http from "../http-common";
import axios from 'axios';

const API_URL = "http://178.18.246.233:8000/";

const getAll = () => {
  return http.get("spec/specialization");
};

const  getAllSubSpec = (id) => {
  return http.get(`spec/specialization/${id}/spubspec_list`);
} 

const postSpec =(state) => {
  return http.post("spec/specialization/" , state);
}

const updateSpec =(id, state) => {
  return http.put(`spec/specialization/${id}/` , state);
}

const deleteSpec = (id) => {
  return http.delete(`spec/specialization/${id}`);
}

const deleteSubSpecialization = (id) => {
  return http.delete(`spec/subspecialization/${id}`);
}

const postSubSpec =(state) => {
  return http.post("spec/subspecialization/" , state);
}

const updateSubSpec =(id, state) => {
  return http.put(`spec/subspecialization/${id}/` , state);
}

const Specialization = {
  getAll,
  getAllSubSpec,
  postSpec,
  updateSpec,
  updateSubSpec,
  postSubSpec,
  deleteSpec,
  deleteSubSpecialization
};
  
export default Specialization;