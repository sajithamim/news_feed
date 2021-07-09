//import {instance, http} from "../http-common";
import axios from 'axios';

const API_URL = "http://178.18.246.233:8000/";

const access = localStorage.getItem("accessToken")

console.log('access', access)

const http = axios.create({
  
  baseURL: "http://178.18.246.233:8000/api/",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${window.localStorage.getItem('accessToken')}`
    
  }
});

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

const uploadImage =(id, imageUrl) => {
  //console.log("getting put image" , imageUrl);
  //return instance.put(`spec/subspecialization/${id}/icon/` , imageUrl);
}



const Specialization = {
  getAll,
  getAllSubSpec,
  postSpec,
  updateSpec,
  updateSubSpec,
  postSubSpec,
  deleteSpec,
  deleteSubSpecialization,
  uploadImage
};
  
export default Specialization;