const initialState = {
    adsList:[],
    deleteList:[],
    specUsers:[]
};


export default (state = initialState, action) => {
    // console.log("action payload" , action.payload);
    switch (action.type) {
        case 'GET_ADS':
        return {...state , adsList: action.payload}
        case 'DELETE_ADS':
        return {...state , deleteList: action.payload}
        case 'GET_SPEC_USERS':
        return {...state , specUsers: action.payload}
        default:
        return state
    }
  }

