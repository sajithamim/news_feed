import Category from "../services/Category";
import DataService from "../services/data.service";

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
    }
}

export const postCategory = (state, imageData) => async (dispatch) => {
    try {
        const res = await Category.postCategory(state);
        if (res.data.id && imageData) {
            let imgUrl = `topic/category/${res.data.id}/icon/`;
            const imgRes = await DataService.postImage(imgUrl, imageData);
            res.data.image = imgRes.data.image
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
        dispatch({
            type: 'CATEGORY_ERROR',
            error: 'CATEGORY NAME EXIST',
            payload: err,
        });
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
            let imgUrl = `topic/category/${id}/icon/`;
            const imgRes = await DataService.postImage(imgUrl, imageData);
            res.data.image = imgRes.data.image
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

