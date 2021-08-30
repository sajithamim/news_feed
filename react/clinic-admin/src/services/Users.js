import { http } from "../http-common";
import axios from 'axios'; 

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
const putProfilePic = (id, imageData) => {
    let accessToken = localStorage.getItem("accessToken");
    let url = `${process.env.REACT_APP_API_URL}auth/profilepic/${id}/profilepicaddadmin/`;
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
const postOtherQualifications = (otherQualification) => {
    return http.post(`auth/qualifications/` , otherQualification);
}
const getPublicationList = () => {
    return http.get("auth/accomplishments/");
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
    putProfilePic,
    postOtherQualifications,
    getPublicationList, 
}

export default Users;