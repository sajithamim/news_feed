import { http } from "../http-common"

const  getAds = () => {
    return http.get("add/ads");
}
const  deleteAds = (id) => {
    return http.delete(`add/ads/${id}/`);
}
const Ads = {
    getAds,
    deleteAds
}

export default Ads;