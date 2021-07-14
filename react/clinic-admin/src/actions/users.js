import Users from "../services/Users";


export const getUsersList = () => async(dispatch) => {
    try{
        const res = await Users.getUsers();
        dispatch({
            type: 'GET_USER',
            payload: res.data,
        })
    }catch (err) {
        console.log(err);
    }
}

export const getUserCategory = (emailId) => async(dispatch) => {
    try{
        const res = await Users.getUserCategory(emailId);
        dispatch({
            type: 'GET_USER_CATEGORY',
            payload: res.data,
        })
    }catch (err) {
        console.log(err);
    }
}

export const getUserSpecialization = (emailId) => async(dispatch) => {
    try{
        const res = await Users.getUserSpec(emailId);
        dispatch({
            type: 'GET_USER_SPEC',
            payload: res.data,
        })
    }catch (err) {
        console.log(err);
    }
}

export const getUserDetails = (emailId) => async(dispatch) => {
    console.log("hjhjhjh");
    try{
        const res = await Users.getUserData(emailId);
        console.log("user details" ,res.data);
        dispatch({
            type: 'GET_USER_DETAILS',
            payload: res.data,
        })
    }catch (err) {
        console.log(err);
    }
}