import  Settings from "../services/Settings";

export const getPrivacy = () => async(dispatch) => {
    try{
        const res = await Settings.getPrivacy();
        return res;
    }
    catch (err) {

    }
}

export const getAbout = () => async(dispatch) => {
    try{
        const res = await Settings.getAbout();
        console.log("response get", res);
        return res;
    }
    catch (err) {

    }
}

export const getTerms = () => async(dispatch) => {
    try{
        const res = await Settings.getTerms();
        console.log("response get", res);
        return res;
    }
    catch (err) {

    }
}

export const getContact = () => async(dispatch) => {
    try{
        const res = await Settings.getContact();
        console.log("response get", res);
        return res;
    }
    catch (err) {

    }
}
export const postPrivacy = (state) => async(dispatch) => { 
    try{
        const res = await Settings.postPrivacy(state);
        console.log("res" , res);
        dispatch({
            type: 'POST_PRIVACY',
            payload: res.data,
        })
     }
    catch (err) {

    }
}
export const postAbout = (state) => async(dispatch) => { 
    try{
        const res = await Settings.postAbout(state);
        console.log("res" , res);
        dispatch({
            type: 'POST_ABOUT',
            payload: res.data,
        })
     }
    catch (err) {

    }
}

export const postContact = (state) => async(dispatch) => { 
    try{
        const res = await Settings.postContact(state);
        console.log("res" , res);
        dispatch({
            type: 'POST_CONTACT',
            payload: res.data,
        })
     }
    catch (err) {

    }
}

export const postTerms = (state) => async(dispatch) => { 
    try{
        const res = await Settings.postTerms(state);
        console.log("res" , res);
        dispatch({
            type: 'POST_TERMS',
            payload: res.data,
        })
     }
    catch (err) {

    }
}

