import { http } from "../http-common"

const  getAds = () => {
    return http.get("add/ads");
}
const  postAdds = (state) => {
    return http.post(`add/ads/`,state);
}
const postAdsImage = (adsId , imgData) => {
    return http.put(`add/ads/${adsId}` , imgData);
}
const  putAdds = (state , id) => {
    return http.put(`add/ads/${id}/`, state);
}
const  deleteAds = (id) => {
    return http.delete(`add/ads/${id}/`);
}
const  getSpecUsers = (id) => {
    return http.get(`auth/userlistspecialization/${id}/`);
}
const  postAddsVisibility = (state) => {
    return http.post(`add/adduser/` ,state);
}
const  getEditAdsDetails = (id) => {
    return http.get(`add/ads/${id}`);
}
const  getAdsSelectedUser = (adsId , specid) => {
    return http.get(`add/selecteduser/${adsId}/${specid}/`);
}
const Ads = {
    getAds,
    postAdds,
    deleteAds,
    getSpecUsers,
    postAddsVisibility,
    getEditAdsDetails,
    getAdsSelectedUser,
    putAdds,
    postAdsImage
}

export default Ads;