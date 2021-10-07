import { http } from "../http-common";
import axios from 'axios';

const addData = (url, state) => {
    return http.post(url, state);
}

const postImage = (url, imageData) => {
    let accessToken = localStorage.getItem("accessToken");
    axios.put(url, imageData, {
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

const getData = (url) => {
    return http.get(url);
}

const deleteData = (url) => {
    return http.delete(url)
}

const updateData = (url, newData) => {
    return http.put(url, newData);
}

const editData = (url, newData) => {
    return http.patch(url, newData);
}

const genAds = {
    addData,
    updateData,
    getData,
    postImage,
    deleteData,
    editData
}


export default genAds;