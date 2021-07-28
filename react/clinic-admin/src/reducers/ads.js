const initialState = {
    adsList:[],
    deleteList:[],
    specUsers:[],
    adsUsersList:[],
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
        case 'POST_ADD':
        return {...state , adsList: action.payload}
        case 'POST_ADD_USER':
        return {...state , adsUsersList: action.payload}
        default:
        return state
    }
  }

