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
const getUserProfilePic = (id) => {
    return http.get(`auth/profilepic/${id}`);
}
const updateUserProfile = (id ,state) => {
    return http.put(`/auth/userprofile/${id}/` , state);
}
const getQualifications = () => {
    return http.get("auth/qualifications/");
}
const putpublicationImage = (id , image) => {
    let accessToken = localStorage.getItem("accessToken");
    let url = `${process.env.REACT_APP_API_URL}auth/accomplishments/${id}/image/`;
    axios.put(url, image, {
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
const getPublicationList = (id) => {
    return http.get(`auth/getuseraccomplishment/${id}/`);
}

const postPublicationDetails = (state) => {
    return http.post("auth/accomplishments/" , state);
}
const updatePublicationDetails = (id ,state) => {
    return http.put(`auth/accomplishments/${id}/` , state);
}
const deleteUserPublication = (id) => {
    return http.delete(`auth/accomplishments/${id}`);
    
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
    updateUserProfile,
    getPublicationList,
    postPublicationDetails,
    deleteUserPublication,
    putpublicationImage,
    getUserProfilePic,
    updatePublicationDetails
}

export default Users;