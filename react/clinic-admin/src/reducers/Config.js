const initialState = {
    configData: '',
    getConfigData:false,
    addConfigData: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'RETRIEVE_CONFIGURATION':
            return { ...state,  configData: action.payload , addConfigData: false , getConfigData: false,}
        case 'POST_CONFIGURATION':
            return { ...state, addConfigData: true, configData: action.payload }
        default:
            return state;
    }
}
