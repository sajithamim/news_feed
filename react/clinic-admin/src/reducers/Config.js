const initialState = {
    configData: '',
    getConfigData:false,
    addConfigData: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'RETRIEVE_CONFIGURATION':
            return { ...state,  configData: action.payload};
        case 'POST_CONFIGURATION':
            return { ...state, addConfigData: true, configData: action.payload };
            case 'EDIT_CONFIGURATION':
                return { ...state, getConfigData: true }
        default:
            return state;
    }
}
