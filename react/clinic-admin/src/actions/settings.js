import  Settings from "../services/Settings";

export const getSettings = () => async(dispatch) => {
    try{
        const res = await Settings.getSettings();
        return res;
    }
    catch (err) {

    }
}

export const patchSettings = (id ,state) => async(dispatch) => {
    try{
        const res = await Settings.patchSettings(id ,state);
        dispatch({
            type: 'POST_SETTINGS',
            payload: res.data,
        })
    }
    catch (err) {

    }
}

export const postSettings = (state) => async(dispatch) => { 
    try{
        const res = await Settings.postSettings(state);
        console.log("settings come",res);
        dispatch({
            type: 'POST_SETTINGS',
            payload: res.data,
        })
    }
    catch (err) {

    }
}



