import { http } from "../http-common";
import axios from 'axios';

const postGenAds = (state) => {
    return http.post("add/alluseradd/" , state);
}

const putAdsImage = (id, imageData) => {
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

const updateGeneralAdvertisment = (id, newData) => {
    console.log("hhjhjj" , newData);
    return http.put(`add/alluseradd/${id}/` ,newData);
}

const genAds = {
    getGenAds,
    postGenAds,
    putAdsImage,
    deleteGenAds,
    updateGeneralAdvertisment
}


export default genAds;