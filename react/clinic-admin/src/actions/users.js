import Users from "../services/Users";
import DataService from "../services/data.service";


export const getUsersList = (page) => async (dispatch) => {
    page = page !== undefined ? page : 1;
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
        const url = `topic/getusercategory/${emailId}`;
        const res = await DataService.getData(url);
        dispatch({
            type: 'GET_USER_CATEGORY',
            payload: res.data,
        })
    } catch (err) {

    }
}

export const getUserSpecialization = (emailId) => async (dispatch) => {
    try {
        const url = `spec/getuserspecialization/${emailId}`;
        const res = await DataService.getData(url);
        dispatch({
            type: 'GET_USER_SPEC',
            payload: res.data,
        })
    } catch (err) {

    }
}

export const getUserDetails = (emailId) => async (dispatch) => {
    try {
        const url = `auth/userdetail/${emailId}`;
        const res = await DataService.getData(url);
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
        const url = `auth/userprofile/`;
        const res = await DataService.addData(url, state);
        if (otherQualification &&  otherQualification){
            const qualfiUrl = `auth/qualifications/`;
            const resQuali = await DataService.addData(qualfiUrl, otherQualification);
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
        const url = `auth/getuserprofile/${id}`;
        const res = await DataService.getData(url);
        // const res = await Users.getUserProfile(id);
        if (res) {
            const url = `auth/profilepic/${id}`;
            const res = await DataService.getData(url);
            // const res1 = await Users.getUserProfilePic(id);
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
        const url = `/auth/userprofile/${id}/`;
        const res = await DataService.updateData(url, state);
        // const res = await Users.updateUserProfile(id, state);
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
        const url = `auth/qualifications/`;
        const res = await DataService.getData(url);
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
            const imageUrl = `${process.env.REACT_APP_API_URL}auth/profilepic/${id}/profilepicaddadmin/`;
            const res= await DataService.putImage(imageUrl, image, form_data)
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
        const url = `auth/getuseraccomplishment/${id}/`;
        const res = await DataService.getData(url);
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
        const url = `auth/accomplishments/`;
        const res = await DataService.addData(url, state);
        if(res.status == 200) {
            if (image && res.data.id) {
                const imageUrl = `${process.env.REACT_APP_API_URL}auth/accomplishments/${res.data.id}/image/`;
                const res1 = await DataService.putImage(imageUrl, image)
                res.data.image = res1.data.image
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
        const url = `auth/accomplishments/${id}/`;
        const res = await DataService.updateData(url, state);
        // const res = await Users.updatePublicationDetails(id, state);
        if(res.status == 200) {
           
            if (res && image) {
                const res1 = await DataService.putImage(res.data.id, image)
                const url = `${process.env.REACT_APP_API_URL}auth/accomplishments/${id}/image/`;
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
        const url = `auth/accomplishments/${id}`;
        const res = await DataService.deleteData(url);
        // const res = await Users.deleteUserPublication(id);
        dispatch({
            type: 'DELETE_USER_PUBLICATION',
            payload: id,
        });
    } catch (err) {

    }
}






