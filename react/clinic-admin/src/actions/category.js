import Category from "../services/Category";

export const getCategory = (page) => async (dispatch) => {
    page = page != undefined ? page : 1;
    try {
        const res = await Category.getAllCategory(page);
        dispatch({
            type: 'RETRIEVE_CATEGORY',
            payload: res.data,
            page: page
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
            });return res;
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
        })
        return res;
    } catch (err) {
        console.log(err);
    }
}

