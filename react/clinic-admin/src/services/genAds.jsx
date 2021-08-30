import { http } from "../http-common";
import axios from 'axios';

const postGenAds = (state) => {
    return http.post("add/alluseradd/" , state);
}
const putAdsImage = ( id ,imgData) => {
    return http.put(`add/alluseradd/${id}/` , imgData)
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