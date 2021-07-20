import Category from "../services/Category";

export const getCategory = () => async (dispatch) => {
    try {
        const res = await Category.getAllCategory();
        dispatch({
            type: 'RETRIEVE_CATEGORY',
            payload: res.data
        });
    }
    catch (err) {
        console.log("error");
    }
}

export const postCategory = (state, imageData) => async (dispatch) => {
    try {
        const res = await Category.postCategory(state);
        if (res.data.id && imageData) {
            console.log('imageData', imageData)
            await Category.updateImageCat(res.data.id, imageData);
            dispatch({
                type: 'ADD_CATEGORY',
                payload: res.data,
            });
        } else {
            dispatch({
                type: 'ADD_CATEGORY',
                payload: res.data,
            });
        }
    }
    catch (err) {
        console.log("error");
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        const res = await Category.deleteCategory(id);
        dispatch({
            type: 'DELETE_SUCCESS',
            payload: id,
        });
        return res;

    }
    catch (err) {
        return err;
    }
}

export const updateCategory = (id, state, imageData) => async (dispatch) => {
    try {
        const res = await Category.updateCat(id, state);
        if (res && imageData) {
            await Category.updateImageCat(id, imageData);
        }
        dispatch({
            type: 'EDIT_CATEGORY',
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
}

