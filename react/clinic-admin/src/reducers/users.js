const initialState= {
    userList:[],
    userCategory:[],
    userSpec:[],
    userDetails:[]
};

const users = (state = initialState , action) => {
    switch(action.type) {
        case 'GET_USER':
        return {...state , userList: action.payload }
        case 'GET_USER_CATEGORY':
        return {...state , userCategory: action.payload }
        case 'GET_USER_SPEC':
        return {...state , userSpec: action.payload }
        case 'GET_USER_DETAILS':
        return {...state , userDetails: action.payload }
        default: 
        return state;
    }
}
export default users;