import {http} from "../http-common";
import axios from 'axios';

const getAllCategory = () => {
    return http.get("topic/category");
};

const postCategory = (state) => {
    return http.post("topic/category/" , state);
}

const deleteCategory = (id) => {
    return http.delete(`topic/category/${id}`);
}

const updateCat = (id , state) => {
    return http.put(`topic/category/${id}/` , state);
}

const updateImageCat = (id, imageData) => {
  let accessToken = localStorage.getItem("accessToken");
  let url = `http://178.18.246.233:8000/api/topic/category/${id}/icon/`;
  axios.put(url, imageData, {
    headers: {
      'content-type': 'multipart/form-data',
      'authorization': `Bearer ${accessToken}`
    }
  })
  .then(res => {
    console.log('responseSSSSS', url)
  return res
  })
  .catch(err => err)
 }

const Category = {
    getAllCategory,
    postCategory,
    deleteCategory,
    updateCat,
    updateImageCat
}

export default Category;