import { http} from "../http-common";
import axios from 'axios';

const getTopic = (page) => {
  return http.get(`topic/topic/?page=${page}`);
};

const deleteTopic = (id) => {
  return http.delete(`topic/topic/${id}`);
};

const deleteImage = (id) => {
  return http.delete(`topic/deletetopicimage/${id}`);
};

const postTopic = (state) => {
  return http.post(`topic/topic/`, state);
};

const updateTopic = (id , state) => {
  return http.put(`topic/topic/${id}/`, state);
}
const getSpecialization = () => {
  return http.get("spec/getspec/")
} 
const getCategory = () => {
  return http.get("topic/getallcategory/");
}

const putPdfdata =(id, pdfData) => {
  let accessToken = localStorage.getItem("accessToken");
  let url = `${process.env.REACT_APP_API_URL}topic/topic/${id}/pdf/`;
  axios.put(url, pdfData, {
    headers: {
      'content-type': 'multipart/form-data',
      'authorization': `Bearer ${accessToken}`
    }
  })
  .then(res => {
  return res
  })
  .catch(err => err)
}

const putPdfdata2 =(id, pdfData2) => {
  let accessToken = localStorage.getItem("accessToken");
  let url = `${process.env.REACT_APP_API_URL}topic/topic/${id}/secondpdf/`;
  axios.put(url, pdfData2, {
    headers: {
      'content-type': 'multipart/form-data',
      'authorization': `Bearer ${accessToken}`
    }
  })
  .then(res => {
  return res
  })
  .catch(err => err)
}

const putImagedata =(imageData) => {
  let accessToken = localStorage.getItem("accessToken");
  let url = `${process.env.REACT_APP_API_URL}topic/topicimages/`;
  axios.post(url, imageData, {
    headers: {
      'content-type': 'multipart/form-data',
      'authorization': `Bearer ${accessToken}`
    }
  })
  .then(res => {
  return res
  })
  .catch(err => err)
}

const Topic = {
  getTopic,
  deleteTopic,
  postTopic,
  putPdfdata,
  putImagedata,
  deleteImage,
  updateTopic,
  putPdfdata2,
  getSpecialization,
  getCategory
};

export default Topic;
