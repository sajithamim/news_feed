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

const getGenAds = () => {
    return http.get("add/alluseradd");
}

const deleteGenAds = (id) => {
    return http.delete(`add/alluseradd/${id}`)
}

const genAds = {
    getGenAds,
    postGenAds,
    putAdsImage,
    deleteGenAds
}


export default genAds;