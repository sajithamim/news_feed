const initialState = {
    settingsList :[],
    postSettingsList:[],
    contactList:[],
};


export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_SETTINGS':
        return {...state , settingsList: action.payload}
        case 'POST_PRIVACY':
        return {...state , postSettingsList: action.payload}
        case 'POST_ABOUT':
        return {...state , postSettingsList: action.payload} 
        case 'GET_CONTACT':
        return {...state , contactList: action.payload, page: action.page}  
        case 'DELETE_CONTACT':
            return {...state, contactList: Object.assign({}, state.contactList, {results: state.contactList && state.contactList.results && state.contactList.results.filter(item => item.id !== action.payload)})};
        default:
        return state
    }
  }

