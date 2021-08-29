import { http } from "../http-common";
import axios from 'axios';

const postGenAds = (state) => {
    console.log("service state" ,state)
    return http.post("add/alluseradd/" , state);
}
const putAdsImage = ( id ,imgData) => {
    return http.put(`add/alluseradd/${id}/` , imgData)
}

const getGenAds = () => {
    return http.get("add/alluseradd");
}

const genAds = {
    getGenAds,
    postGenAds,
    putAdsImage
}


export default genAds;