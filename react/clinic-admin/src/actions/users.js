import Users from "../services/Users";
import DataService from "../services/data.service";


export const getUsersList = (page) => async (dispatch) => {
    page = page != undefined ? page : 1;
    try {
        const url = `auth/userlist/?page=${page}`;
        const res = await DataService.getData(url);
        dispatch({
            type: 'GET_USER',
            payload: res.data,
            page: page
        })
    } catch (err) {
        dispatch({
            type: 'HANDLE_ERROR',
            error: 'Some errors occured.',
            status: err,
        })
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

    }
}

export const deleteUser = (id, page) => async (dispatch) => {
    try {
        const deleteUrl = `auth/deleteuser/${id}`;
        const deleteRes = await DataService.deleteData(deleteUrl);
        const getUrl = `auth/userlist/?page=${page}`;
        const dataRes = await DataService.getData(getUrl);

        dispatch({
            type: 'DELETE_USER',
            payload: dataRes.data,
            page: page,
            message: 'User deleted successfully.',
        })
    } catch (err) {
        dispatch({
            type: 'HANDLE_ERROR',
            message: 'Some errors are occured.',
        })
    }
}

export const postUserProfile = (state, otherQualification) => async (dispatch) => {
    try {
        const res = await Users.postUserProfile(state);
        console.log("post user deatsil", res);
        if (otherQualification){
            const resQuali = await Users.postOtherQualifications(otherQualification);
        }
        dispatch({
            type: 'POST_USER_PROFILE',
            payload: res.data,
        })
    } catch (err) {

    }
}
export const getUserProfile = (id) => async (dispatch) => {
    try {
        const res = await Users.getUserProfile(id);
        if (res) {
            const res1 = await Users.getUserProfilePic(id);
        }
        dispatch({
            type: 'GET_USER_PROFILE',
            payload: res.data,
        })
        return res;
    } catch (err) {

    }
}
export const updateUserProfile = (id, state) => async (dispatch) => {
    try {
        const res = await Users.updateUserProfile(id, state);
        dispatch({
            type: 'UPDATE_USER_PROFILE',
            payload: res.data,
        })
        return res;
    } catch (err) {

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

        }
    }
}

export const getPublicationList = (id) => async (dispatch) => {
    try {
        const res = await Users.getPublicationList(id);
        dispatch({
            type: 'GET_PUBLICATION_LIST',
            payload: res,
        })
        return res;
    } catch (err) {

    }
}

export const postPublicationDetails = (state, image) => async (dispatch) => {
    try {
        const res = await Users.postPublicationDetails(state);
        if(res.status == 200) {
            if (image) {
                const res1 = await Users.putpublicationImage(res.data.id, image)
            }
            dispatch({
                type: 'POST_PUBLICATION_LIST',
                message: 'Publication added successfully.',
                data: res.data
            })
        } else {
            dispatch({
                type: 'HANDLE_ERROR',
                message: 'Some errors occured.',
            })
        }
    } catch (err) {

    }
}
export const updatePublicationDetails = (id, state, image) => async (dispatch) => {
    try {
        const res = await Users.updatePublicationDetails(id, state);
        if(res.status == 200) {
           
            if (res && image) {
                const res1 = await Users.putpublicationImage(res.data.id, image)
            }
            
            dispatch({
                type: 'UPDATE_PUBLICATION_LIST',
                message: 'Publication updated successfully.',
                data: res.data
            })
        } else {
            dispatch({
                type: 'HANDLE_ERROR',
                message: 'Some errors occured.',
            })
        }
        //return res;
    } catch (err) {

    }
}
export const deleteUserPublication = (id) => async (dispatch) => {
    try {
        const res = await Users.deleteUserPublication(id);
        dispatch({
            type: 'DELETE_USER_PUBLICATION',
            payload: id,
        });
    } catch (err) {

    }
}






