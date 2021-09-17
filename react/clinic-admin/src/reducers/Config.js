const initialState = {
    addConfigData: false,
};

export default (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {

        case 'POST_CONFIGURATIO':
            return { ...state, addConfigData: true }
    }
}
