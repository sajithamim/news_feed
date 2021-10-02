import  Settings from "../services/Settings";
import DataService from "../services/data.service";

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
        const url = '/poll/contactus/'
        const res = await DataService.getContact(url);
        dispatch({
            type: 'GET_CONTACT',
            payload:res.data,
        })
        return res;
    }
    catch (err) {

    }
}

export const deleteContactMessage = (id) => async(dispatch) => {
    try{
        const url = `/poll/contactus/${id}`
        const res = await DataService.deleteContactMessage(url);
        console.log("response deleytee get", res);
        dispatch({
            type: 'DELETE_CONTACT',
            payload:res.data,
        })
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
        const url = '/poll/contactus/';
        const res = await DataService.postContact(url, state);
        console.log("res" , res);
        dispatch({
            type: 'POST_CONTACT',
            message: 'Contact details added successfully',
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

