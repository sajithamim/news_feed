import  Settings from "../services/Settings";

export const getSettings = () => async(dispatch) => {
    try{
        const res = await Settings.getSettings();
        console.log("restest" ,res);
        return res;
    }
    catch (err) {

    }
}

export const patchSettings = (id ,state) => async(dispatch) => {
    console.log("settings come")
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
    console.log("ghgh" , state);
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



