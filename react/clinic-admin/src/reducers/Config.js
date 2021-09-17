const initialState = {
    addConfigData: false,
};

export default (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case 'POST_CONFIGURATION':
            return { ...state, addConfigData: true }
        default:
            return state;
    }
}
