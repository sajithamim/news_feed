const initialState = {
    configData: '',
    getConfigData:false,
    addConfigData: false,
};

export default (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {

        case 'RETRIEVE_CONFIGURATION':
            return { ...state, getConfigData: true, configData: action.payload }
        case 'POST_CONFIGURATION':
            return { ...state, addConfigData: true }
        default:
            return state;
    }
}
