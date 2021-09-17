import Config from "../services/Config";

export const postConfiguration = (state) => async (dispatch) => {
    try {
        const res = await Config.postConfiguration(state);
            dispatch({
                type: 'POST_CONFIGURATION',
                payload: res.data,
            });
            return res;
    } 
    catch (err) {

    }
}

