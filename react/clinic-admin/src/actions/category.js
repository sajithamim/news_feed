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

export const postCategory = (state) => async (dispatch) => {
    try {
        const res = await Category.postCategory(state);
        dispatch({
            type: 'ADD_CATEGORY',
            payload: res.data,
        });
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


