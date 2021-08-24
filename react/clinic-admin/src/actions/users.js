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
        return res;
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
        console.log("res", res);
        dispatch({
            type: 'POST_USER_PROFILE',
            payload: res.data,
        })
    } catch (err) {
        console.log(err)
    }
}
export const getUserProfile = (id) => async (dispatch) => {
    console.log("id", id);
    try {
        const res = await Users.getUserProfile(id);
        console.log("user response", res);
        dispatch({
            type: 'GET_USER_PROFILE',
            payload: res.data,
        })
        return res;
    } catch (err) {
        console.log(err)
    }
}
export const getQualifications = () => async (dispatch) => {
    try {
        const res = await Users.getQualifications();
        dispatch({
            type: 'GET_QUALIFICATIONS',
            payload: res.data,
        })
        return res;
    } catch (err) {
        console.log(err)
    }
}
export const putProfilePic = (id , imageUrl) => async (dispatch) => {
    console.log("id" , id);
    console.log("imageUrl" , imageUrl);
    /*try {
        const res = await Users.putProfilePic(id , imageUrl);
        dispatch({
            type: 'PUT_PROFILEPIC',
            payload: res.data,
        })
    } catch (err) {
        console.log(err)
    }*/
}
