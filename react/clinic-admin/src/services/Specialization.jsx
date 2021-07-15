import { http } from "../http-common";
import axios from 'axios';


const getAll = () => {
  return http.get("spec/specialization");
};

const  getAllSubSpec = (id) => {
  return http.get(`spec/specialization/${id}/spubspec_list`);
} 

const postSpec =(state) => {
  return http.post("spec/specialization/" , state);
}

const updateSpec =(id, data) => {
  return http.put(`spec/specialization/${id}/`, data);
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

const updateSubSpec =(id, imageData) => {
  return http.put(`spec/subspecialization/${id}/` , imageData);
}

const uploadImage =(id, imageData) => {
  let url = `http://178.18.246.233:8000/api/spec/specialization/${id}/icon/`;
  axios.put(url, imageData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
  .then(res => {
  return res
  })
  .catch(err => err)
}

const uploadSubImage = (id, imageData) => {
  let url = `http://178.18.246.233:8000/api/spec/subspecialization/${id}/icon/`;
  axios.put(url, imageData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
  .then(res => {
  return res;
  })
  .catch(err => err)
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
  uploadImage,
  uploadSubImage
};
  
export default Specialization;