import ActionButton from "antd/lib/modal/ActionButton";
import Users from "../services/Users";


export const getUsersList = (page) => async (dispatch) => {
    page = page != undefined ? page : 1;
    try {
        const res = await Users.getUsers(page);
        dispatch({
            type: 'GET_USER',
            payload: res.data,
            page: page
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

export const postUserProfile = (state, otherQualification) => async (dispatch) => {
    try {
        const res = await Users.postUserProfile(state);
        if (otherQualification.name !== null)
            await Users.postOtherQualifications(otherQualification);

        dispatch({
            type: 'POST_USER_PROFILE',
            payload: res.data,
        })
    } catch (err) {
        console.log(err)
    }
}
export const getUserProfile = (id) => async (dispatch) => {
    try {
        const res = await Users.getUserProfile(id);
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


export const putProfilePic = (id, image) => async (dispatch) => {
    let form_data = null;
    if (image[0] && image[0].name) {
        form_data = new FormData();
        form_data.append('profilepic', image[0]);
        try {
            const res = await Users.putProfilePic(id, form_data);
            dispatch({
                type: 'PUT_PROFILEPIC',
                payload: res.data,
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const getPublicationList = () => async (dispatch) => {
    try {
        const res = await Users.getPublicationList();
        dispatch({
            type: 'GET_PUBLICATION_LIST',
            payload: res.data,
        })
        return res;
    } catch (err) {
        console.log(err)
    }
}




