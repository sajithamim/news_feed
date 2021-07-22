import  Settings from "../services/Settings";

export const getSettings = () => async(dispatch) => {
    try{
        const res = await Settings.getSettings();
        return res;
        // dispatch({
        //     type: 'GET_SETTINGS',
        //     payload: res.data,
        // })
    }
    catch (err) {

    }
}

export const postSettings = (state) => async(dispatch) => {
    console.log("settings come")
    try{
        const res = await Settings.postSettings(state);
        console.log("gghhghg" ,res);
        dispatch({
            type: 'POST_SETTINGS',
            payload: res.data,
        })
    }
    catch (err) {

    }
}