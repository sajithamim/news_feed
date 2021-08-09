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


const Users = {
    getUsers,
    getUserCategory,
    getTopic,
    getUserSpec,
    getUserData,
    deleteUser
}

export default Users;