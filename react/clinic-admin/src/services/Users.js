import { http } from "../http-common";


const getUsers = () => {
    return http.get("auth/userlist/");
}

const getUserCategory = (emailId) => {
    return http.get(`topic/getusercategory/${emailId}`)
}

const getTopic = () => {
    return http.get(`topic/topic`)
}

const getUserSpec = (emailId) => {
    return http.get(`spec/getuserspecialization/${emailId}`)
}
const getUserData = (emailId) => {
    return http.get(`auth/userdetail/${emailId}`)
}
const deleteUser = (id) => {
    return http.delete(`auth/deleteuser/${id}`)
}
const postUserProfile = (state) => {
    return http.post("auth/userprofile/" ,state);
}
const getUserProfile = (id) => {
    console.log("ser id",id);
    return http.get("auth/userprofile/" ,id);
}
const Users = {
    getUsers,
    getUserCategory,
    getTopic,
    getUserSpec,
    getUserData,
    deleteUser,
    postUserProfile,
    getUserProfile
}

export default Users;