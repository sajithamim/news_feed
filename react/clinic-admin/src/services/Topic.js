import { http} from "../http-common";
import axios from 'axios';

const getTopic = () => {
  return http.get("topic/topic");
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

const putPdfdata =(id, pdfData) => {
  let accessToken = localStorage.getItem("accessToken");
  let url = `http://178.18.246.233:8000/api/topic/topic/${id}/pdf/`;
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

const putImagedata =(imageData) => {
  let accessToken = localStorage.getItem("accessToken");
  let url = `http://178.18.246.233:8000/api/topic/topicimages/`;
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
  deleteImage
};
  
export default Topic;