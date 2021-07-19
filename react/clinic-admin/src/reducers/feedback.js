const initialState = {
    feedbackList:[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_FEEDBACK':
            return { ...state , feedbackList: action.payload}
        default:
            return state
    }
}