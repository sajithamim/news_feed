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

export const getConfiguration = () => async (dispatch) => {
    try {
        const res = await Config.getConfiguration();
        console.log("respones", res);
        dispatch({
            type: 'RETRIEVE_CONFIGURATION',
            payload: res.data,
        });
    } catch (err) {
    }
}

export const updateConfiguration = (state) => async (dispatch) => {
    try {
        const res = await Config.updateConfig(state);
        dispatch({
            type: 'EDIT_CONFIGURATION',
            payload: res.data,
        })
        return res;
    } catch (err) {
    
    }
}


