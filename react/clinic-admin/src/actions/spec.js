import axios from "axios";
import Specialization from "../services/Specialization";

export const getSpecialization = () => async (dispatch) => {
    try {
        const res = await Specialization.getAll();
        dispatch({
            type: 'RETRIEVE_SPECIALIZATION',
            payload: res.data,
        });
    } catch (err) {
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
    }
}

export const postSpecialization = (state, imageData) => async (dispatch) => {
    try {
        const res = await Specialization.postSpec(state);
        if (res.data.id && imageData) {
            const res1 = await Specialization.uploadImage(res.data.id, imageData);
            dispatch({
                type: 'ADD_SPECIALIZATION',
                payload: res.data,
            });
        }
    } catch (err) {
    }
}

export const updateSpecialization = (id, state, imageData) => async (dispatch) => {
    try {
        const res = await Specialization.updateSpec(id, state);
        if (res.data && imageData) {
            const imageRes = await Specialization.uploadImage(id, imageData);
            dispatch({
                type: 'ADD_IMAGE',
                payload: res.data,
            })
        }
        dispatch({
            type: 'EDIT_SPECIALIZATION',
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
}

export const updateSubSpecialization = (id, state, imageData) => async (dispatch) => {
    try {
        const res = await Specialization.updateSubSpec(id, state);
        if (res.data && imageData) {
            const imageSubRes = await Specialization.uploadSubImage(id, imageData);
            dispatch({
                type: 'ADD_SUB_IMAGE',
                payload: res.data,
            })
        }
        dispatch({
            type: 'EDIT_SUB_SPECIALIZATION',
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
}

export const postSubSpecialization = (state, imageData) => async (dispatch) => {
    try {
        const res = await Specialization.postSubSpec(state);
        if (res.data.id && imageData) {
            const imageSubRes = await Specialization.uploadSubImage(res.data.id, imageData);
            dispatch({
                type: 'ADD_SUB_SPECIALIZATION',
                payload: res.data,
            });
        }
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

    export const image = () => async (dispatch) => {
        console.log("testing action");
    }




