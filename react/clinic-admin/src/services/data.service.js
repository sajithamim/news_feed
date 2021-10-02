import { http } from "../http-common";
import axios from 'axios';

const addData = (url, state) => {
    return http.post(url, state);
}

const postImage = (id, imageData) => {

    let accessToken = localStorage.getItem("accessToken");
    let url = `${process.env.REACT_APP_API_URL}add/alluseradd/${id}/image/`;
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

const getGenAds = (page) => {
    console.log("page serv", page)
    return http.get(`add/alluseradd?page=${page}`);
}

const deleteGenAds = (id) => {
    return http.delete(`add/alluseradd/${id}`)
}

const updateData = (url, newData) => {
    return http.put(url, newData);
}
const postContact = (url, state) => {
    return http.post(url, state);
}
const getContact = (url) => {
    console.log("coming to contact service");
    return http.get(url);
}

const deleteContactMessage = (url) => {
    console.log("coming to delete service",url);
    return http.delete(url);
}
const genAds = {
    addData,
    updateData,
    getGenAds,
    // putAdsImage,
    deleteGenAds,
    postContact,
    getContact,
    deleteContactMessage
}


export default genAds;