import { http } from "../http-common"

const  getAds = () => {
    return http.get("add/ads");
}
const  deleteAds = (id) => {
    return http.delete(`add/ads/${id}/`);
}
const  getSpecUsers = (id) => {
    return http.get(`auth/userlistspecialization/${id}/`);
}
const Ads = {
    getAds,
    deleteAds,
    getSpecUsers
}

export default Ads;