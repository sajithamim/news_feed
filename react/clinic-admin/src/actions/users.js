import ActionButton from "antd/lib/modal/ActionButton";
import Users from "../services/Users";


export const getUsersList = () => async (dispatch) => {
    try {
        const res = await Users.getUsers();
        dispatch({
            type: 'GET_USER',
            payload: res.data,
        })
    } catch (err) {
        console.log(err);
    }
}

export const getUserCategory = (emailId) => async (dispatch) => {
    try {
        const res = await Users.getUserCategory(emailId);
        dispatch({
            type: 'GET_USER_CATEGORY',
            payload: res.data,
        })
    } catch (err) {
        console.log(err);
    }
}

export const getUserSpecialization = (emailId) => async (dispatch) => {
    try {
        const res = await Users.getUserSpec(emailId);
        dispatch({
            type: 'GET_USER_SPEC',
            payload: res.data,
        })
    } catch (err) {
        console.log(err);
    }
}

export const getUserDetails = (emailId) => async (dispatch) => {
    try {
        const res = await Users.getUserData(emailId);
        dispatch({
            type: 'GET_USER_DETAILS',
            payload: res.data,
        })
    } catch (err) {
        console.log(err);
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        const res = await Users.deleteUser(id);
        dispatch({
            type: 'DELETE USER',
            payload: id,
        })
    } catch (err) {
        console.log(err);
    }
}

export const postUserProfile = (state) => async (dispatch) => {
    try {
        const res = await Users.postUserProfile(state);
        dispatch({
            type: 'POST_USER_PROFILE',
            payload: ActionButton.payload,
        })
    } catch (err) {
        console.log(err)
    }
}