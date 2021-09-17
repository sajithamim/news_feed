import Configuration from "../services/Config";

export const postConfiguration = (name) => async (dispatch) => {
    try {
        const res = await Configuration.postConfiguration(name);
            dispatch({
                type: 'POST_CONFIGURATION',
                payload: res.data,
            });
            return res;
    } 
    catch (err) {

    }
}

