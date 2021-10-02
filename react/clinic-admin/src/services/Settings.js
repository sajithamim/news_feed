import { http } from "../http-common"

const  getPrivacy = () => {
    return http.get("poll/privacypolicy/");
}
const  getAbout = () => {
    return http.get("poll/aboutus");
}
const  postPrivacy = (state) => {
    return http.post(`poll/privacypolicy/` , state);
}
const  postAbout = (state) => {
    console.log("service sttea", state);
    return http.post(`poll/aboutus/` , state);
}
const  getContact = () => {
    return http.get("poll/contactus/");
}
const  postContact = (state) => {
    return http.post(`poll/conatctus/` , state);
}
const  postTerms = (state) => {
    return http.post(`poll/tos/` , state);
}
const  getTerms = (state) => {
    return http.get(`poll/tos/` , state);
}
const Settings = {
    getPrivacy,
    postPrivacy ,
    postAbout,
    getAbout,
    postContact,
    getContact,
    postTerms,
    getTerms
}

export default Settings;