
import Specialization from "../services/Specialization";

export const getSpecialization = () => async (dispatch) => {
    console.log('calling ....')
    try {
        const res = await Specialization.getAll();
        dispatch({
            type: 'RETRIEVE_SPECIALIZATION',
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
}

export const getSubSpecialisation = (id) => async (dispatch) => {
    try {
        const res = await Specialization.getAllSubSpec(id);
        dispatch({
            type: 'RETREIVE_SUB_SPECIALIZATION',
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
}

export const postSpecialization = (state) => async (dispatch) => {
    try {
        const res = await Specialization.postSpec(state);
        dispatch({
            type: 'ADD_SPECIALIZATION',
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
}

export const updateSpecialization = (id, state , imageUrl)  => async (dispatch) => {
    try {
        console.log("imageuel",imageUrl);
        const res = await Specialization.updateSpec(id, state);
        if(res.data && imageUrl) {
            const icon = await Specialization.uploadImage(id , imageUrl);
            console.log("action testing" , icon)
            // dispatch({
            //     type: 'ADD_IMAGE',
            //     payload: res.data,
            // })
        }
        dispatch({
            type: 'EDIT_SPECIALIZATION',
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
}

export const updateSubSpecialization = (id, state) => async (dispatch) => {
    try {
        const res = await Specialization.updateSubSpec(id, state);
        dispatch({
            type: 'EDIT_SUB_SPECIALIZATION',
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
}

export const postSubSpecialization = (state) => async (dispatch) => {
    
    try {
        const res = await Specialization.postSubSpec(state);
        dispatch({
            type: 'ADD_SUB_SPECIALIZATION',
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
}

export const deleteSpec = (id) => async (dispatch) => {
    try {
        const res = await Specialization.deleteSpec(id);
        dispatch({
            type: 'DELETE_SPECIALIZATION',
            payload: id,
        });
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const deleteSubSpec = (id) => async (dispatch) => {
    try {
        const res = await Specialization.deleteSubSpecialization(id);
        dispatch({
            type: 'DELETE_SUB_SPECIALIZATION',
            payload: id,
        });
        return res;
    } catch (err) {
        console.log(err);
    }
}




