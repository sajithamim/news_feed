import Advisory from "../services/Advisory"

export const getAdvisoryMembersList = (id) => async (dispatch) => {
    try {
        const res = await Advisory.getAdvisoryMembersList(id);
        console.log("res advisru", res);
        dispatch({
            type: 'RETRIEVE_ADVISORYMEMBERS',
            payload: res.data
        });
    } catch (err) {
    }
}

export const postAdvisoryMembersList = (advisoryData) => async (dispatch) => {
    try {
        const res = await Advisory.postAdvisoryMembersList(advisoryData);
        console.log("res advisru", res);
        dispatch({
            type: 'POST_ADVISORYMEMBERS',
            payload: res.data
        });
    } catch (err) {
    }
}