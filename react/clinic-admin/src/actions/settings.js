import  Settings from "../services/Settings";
import DataService from "../services/data.service";

export const getPrivacy = () => async(dispatch) => {
    try{
        const url = '/poll/privacypolicy/'
        const res = await DataService.getData(url);
        return res;
    }
    catch (err) {

    }
}

export const postPrivacy = (state) => async(dispatch) => { 
    try{
        const url = '/poll/privacypolicy/';
        const res = await DataService.addData(url , state);
        dispatch({
            type: 'POST_PRIVACY',
            payload: res.data,
        })
     }
    catch (err) {

    }
}

export const getAbout = () => async(dispatch) => {
    try{
        const url = '/poll/aboutus/';
        const res = await DataService.getData(url);
        console.log("response get", res);
        return res;
    }
    catch (err) {

    }
}

export const getTerms = () => async(dispatch) => {
    try{
        const url = '/poll/tos/'
        const res = await DataService.getData(url);
        return res;
    }
    catch (err) {

    }
}

export const getContact = () => async(dispatch) => {
    try{
        const url = '/poll/contactus/'
        const res = await DataService.getData(url);
        dispatch({
            type: 'GET_CONTACT',
            payload:res.data,
        })
    }
    catch (err) {

    }
}

export const deleteContactMessage = (id) => async(dispatch) => {
    try{
        const url = `/poll/contactus/${id}`
        const res = await DataService.deleteData(url);
        dispatch({
            type: 'DELETE_CONTACT',
            payload: id,
        })
    }
    catch (err) {

    }
}

export const postAbout = (state) => async(dispatch) => { 
    try{
        const url = '/poll/aboutus/';
        const res = await DataService.addData(url , state);
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
        const url = '/poll/tos/';
        const res = await DataService.addData(url , state);
        dispatch({
            type: 'POST_TERMS',
            payload: res.data,
        })
     }
    catch (err) {

    }
}

