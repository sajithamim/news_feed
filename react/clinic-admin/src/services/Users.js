import { http } from "../http-common";


const getUsers = () => {
    return http.get("auth/userlist/");
}

const Users = {
    getUsers
}

export default Users;