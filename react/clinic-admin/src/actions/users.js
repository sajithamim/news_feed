import ActionButton from "antd/lib/modal/ActionButton";
import axios from "axios";

import Users from "../services/Users";


export const getUsersList = () => async(dispatch) => {
    try{
        const res = await Users.getUsers();
        dispatch({
            type: 'GET_USER',
            payload: res.data,
        })
    }catch (err) {
        console.log(err);
    }
}

export const getUserCategory = (emailId) => async(dispatch) => {
    try{
        const res = await Users.getUserCategory(emailId);
        dispatch({
            type: 'GET_USER_CATEGORY',
            payload: res.data,
        })
    }catch (err) {
        console.log(err);
    }
}

