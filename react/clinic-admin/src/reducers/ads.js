const initialState = {
    adsList:[],
    deleteList:[],
    specUsers:[],
    adsUsersList:[],
    adsDetails:[],
    userDetails:[],
    adsUserDetails:[],
    selectedSpecid: null,
    newaddId: null
};


export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ADS':
        return {...state , adsList: action.payload}
        case 'DELETE_ADS':
        return {...state , adsList:Object.assign({}, state.adsList, {results: state.adsList && state.adsList.results && state.adsList.results.filter(item => item.id !== action.payload)})};
        case 'GET_SPEC_USERS':
        return {...state , specUsers: action.payload , specId:action.id }
        case 'POST_ADD':
        return {...state , newaddId: action.payload}
        case 'GET_ADS_DETALS':
        return {...state , adsDetails: action.payload, userDetails: action.userDetails, selectedSpecid: action.selectedSpecid, specUsers: action.specUsers , specId:action.selectedSpecid}
        case 'GET_ADS_USER_DETAILS':
        return {...state , adsUserDetails: action.payload}
        default:
        return state
    }
  }
