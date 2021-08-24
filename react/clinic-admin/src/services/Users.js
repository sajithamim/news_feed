import { http } from "../http-common";


const getUsers = (page) => {
    return http.get(`auth/userlist/?page=${page}`);
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
    return http.post(`auth/userprofile/` ,state);
}
const getUserProfile = (id) => {
    return http.get(`auth/getuserprofile/${id}`);
}
const getQualifications = () => {
    return http.get("auth/qualifications/");
}
const putProfilePic = (id , imageUrl) => {
    return http.put(`auth/profilepic/${id}/profilepicaddadmin/` , imageUrl);
}
const Users = {
    getUsers,
    getUserCategory,
    getTopic,
    getUserSpec,
    getUserData,
    deleteUser,
    postUserProfile,
    getUserProfile,
    getQualifications,
    putProfilePic
}

export default Users;