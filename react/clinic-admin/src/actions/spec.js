import Specialization from "../services/Specialization";
export const getSpecialization = (page) => async (dispatch) => {
    page = page != undefined ? page : 1;
    try {
        const res = await Specialization.getAll(page);
        console.log('page12', page)
        dispatch({
            type: 'RETRIEVE_SPECIALIZATION',
            payload: res.data,
            page: page
        });
    } catch (err) {
    }
}


export const getSubSpecialisation = (id) => async (dispatch) => {
    // page = page != undefined ? page : 1;
    try {
        const res = await Specialization.getAllSubSpec(id);
        console.log("res",res);
        dispatch({
            type: 'RETREIVE_SUB_SPECIALIZATION',
            payload: res.data,
        });
    } catch (err) {
    }
}

export const postSpecialization = (state) => async (dispatch) => {
    try {
        const res = await Specialization.postSpec(state);
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

export const updateSpecialization = (id, state, imageData) => async (dispatch) => {
    try {
        const res = await Specialization.updateSpec(id, state);
        // if (res.data && imageData) {
        //     //const imageRes = await Specialization.uploadImage(id, imageData);
        //     await Specialization.uploadImage(id, imageData);
        //     dispatch({
        //         type: 'ADD_IMAGE',
        //         payload: res.data,
        //     })
        // }
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
        // console.log("sub spec edit", res);
        // if (res.data && imageData) {
        //     //const imageSubRes = await Specialization.uploadSubImage(id, imageData);
        //     await Specialization.uploadSubImage(id, imageData);
        //}
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
        // if (res.data.id && imageData) {
        //     //const imageSubRes = await Specialization.uploadSubImage(res.data.id, imageData);
        //     await Specialization.uploadSubImage(res.data.id, imageData);
            dispatch({
                type: 'ADD_SUB_SPECIALIZATION',
                payload: res.data,
            });
            return res;
        //}
        } 
        catch (err) {
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
        } catch (err) {
            console.log(err);
        }
    }

    export const deleteSubSpec = (id) => async (dispatch) => {
        try {
            const res = await Specialization.deleteSubSpecialization(id);
            console.log("subspec deletee" , res);
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
    }




