import DataService from "../services/data.service";

export const getSpecialization = (page) => async (dispatch) => {
    page = page != undefined ? page : 1;
    try {
        const url = `spec/specialization?page=${page}`
        const res = await DataService.getData(url);
        dispatch({
            type: 'RETRIEVE_SPECIALIZATION',
            payload: res.data,
            page: page
        });
    } catch (err) {
    }
}


export const getSubSpecialisation = (id) => async (dispatch) => {
    try {
        const url = `spec/specialization/${id}/spubspec_list`
        const res = await DataService.getData(url);
        dispatch({
            type: 'RETREIVE_SUB_SPECIALIZATION',
            payload: res.data,
        });
    } catch (err) {
    }
}

export const postSpecialization = (state) => async (dispatch) => {
    try {
        const url = "spec/specialization/"
        const res = await DataService.addData(url, state);
        // if (res.data.id && imageData) {
        //     //const res1 = await Specialization.uploadImage(res.data.id, imageData);
        //     await Specialization.uploadImage(res.data.id, imageData);
        //     dispatch({
        //         type: 'ADD_SPECIALIZATION',
        //         payload: res.data,
        //     });
        // } else {
        dispatch({
            type: 'ADD_SPECIALIZATION',
            payload: res.data,
        });
        return res;
        //}
    }
    catch (err) {
    }
}

export const updateSpecialization = (id, state, data) => async (dispatch) => { 
    try {
        const url = `spec/specialization/${id}/`
        const res = await DataService.updateData(url, state, data);
        dispatch({
            type: 'EDIT_SPECIALIZATION',
            payload: res.data,
        })
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const updateSubSpecialization = (id, state, imageData) => async (dispatch) => {
    try {
        const url = `spec/subspecialization/${id}/`
        const res = await DataService.updateData(url, state ,imageData);
        dispatch({
            type: 'EDIT_SUB_SPECIALIZATION',
            payload: res.data,
        })
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const postSubSpecialization = (state, imageData) => async (dispatch) => {
    try {
        const url = "spec/subspecialization/"
        const res = await DataService.addData(url, state);
        dispatch({
            type: 'ADD_SUB_SPECIALIZATION',
            payload: res.data,
        });
        return res;
    }
    catch (err) {
        console.log(err);
    }
}

export const deleteSpec = (id) => async (dispatch) => {
    try {
        const url = `spec/specialization/${id}`
        const res = await DataService.deleteData(url);
        dispatch({
            type: 'DELETE_SPECIALIZATION',
            payload: id,
        });
    } catch (err) {
        console.log(err);
    }
}

export const deleteSubSpec = (id) => async (dispatch) => {
    try {
        const url = `spec/subspecialization/${id}`
        const res = await DataService.deleteData(url);
        dispatch({
            type: 'DELETE_SUB_SPECIALIZATION',
            payload: id,
        });
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const getAdvisoryMembersList = (id, specId) => async (dispatch) => {
    try {
        const url = `spec/advisoryuser/${id}/`
        const res = await DataService.getData(url, specId);
        dispatch({
            type: 'RETRIEVE_ADVISORYMEMBERS',
            payload: res.data
        });
    } catch (err) {
    }
}

export const postAdvisoryMembersList = (advisoryData) => async (dispatch) => {
    try {

        const url = "spec/advisory/"
        const res = await DataService.addData(url, advisoryData);
        dispatch({
            type: 'POST_ADVISORYMEMBERS',
            payload: res.data
        });
    } catch (err) {
    }
}
export const deleteAdvisoryMembers = (id) => async (dispatch) => {
    try {
        const url = `spec/advisory/${id}/`
        const res = await DataService.deleteData(url);
        dispatch({
            type: 'DELETE_ADVISORYMEMBERS',
            payload: id
        });
    } catch (err) {
    }
}




