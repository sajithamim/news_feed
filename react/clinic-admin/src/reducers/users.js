const initialState= {
    userList:[]
};

export default (state = initialState , action) => {
    console.log("reducer" , action.type);
    switch(action.type) {
        case 'GET_USER':
        return {...state , userList: action.payload }
        default: 
        return state;
    }
}