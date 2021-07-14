const initialState= {
    userList:[],
    userCategory:[]
};

export default (state = initialState , action) => {
    switch(action.type) {
        case 'GET_USER':
        return {...state , userList: action.payload }
        case 'GET_USER_CATEGORY':
        return {...state , userCategory: action.payload }
        default: 
        return state;
    }
}