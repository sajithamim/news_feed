const initialState = {
    settingsList :[],
    postSettingsList:[]
};


export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_SETTINGS':
        return {...state , settingsList: action.payload}
        case 'POST_SETTINGS':
        return {...state , postSettingsList: action.payload}
        default:
        return state
    }
  }

