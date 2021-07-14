import { http } from "../http-common";


const getUsers = () => {
    return http.get("auth/userlist/");
}

const getUserCategory = (emailId) => {
    return http.get(`topic/getusercategory/${emailId}`)
}

const getTopic = () => {
    return http.get(`topic/topic}`)
}
const Users = {
    getUsers,
    getUserCategory,
    getTopic
}

export default Users;