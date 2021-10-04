const initialState = {
    genAdsList: [],
    success: '',
    error: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'POST_GEN_ADS': {
            if(action.data) {
                state.genAdsList && state.genAdsList.results.splice(0, 0, action.data);
            }
            return { ...state, success: action.message }
        }
        case 'UPDATE_GEN_ADS': {
            let index1 = state.genAdsList && state.genAdsList.results.findIndex(item => item.id === action.data.id);
            state.genAdsList.results[index1] = action.data;
            return { ...state, success: action.message }
        }
        case 'GET_GEN_ADS':
            return { ...state, genAdsList: action.payload, page: action.page }
        case 'DELETE_GEN_ADS':
            return { ...state, genAdsList: Object.assign({}, state.genAdsList, { results: state.genAdsList && state.genAdsList.results && state.genAdsList.results.filter(item => item.id !== action.payload) }) }
        case 'RESET_DATA':
            return { ...state , success: '', error: ''}
        default:
            return state
    }
}
