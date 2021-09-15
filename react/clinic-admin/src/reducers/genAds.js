const initialState = {
    genAdsList: [],
    updateGenAdd: false,
    addGenAdd: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'POST_GEN_ADS':
            return { ...state, addGenAdd: true , genAdsList: Object.assign({}, state.genAdsList, {results: [...state.genAdsList.results, action.payload , ]}) }
        case 'UPDATE_GEN_ADS':
            return { ...state, updateGenAdd: true , genAdsList: Object.assign({}, state.genAdsList, {results: [...state.genAdsList.results, action.payload , ]}) }
        case 'GET_GEN_ADS':
            return { ...state, genAdsList: action.payload, page: action.page }
        case 'DELETE_GEN_ADS':
            return { ...state, genAdsList: Object.assign({}, state.genAdsList, { results: state.genAdsList && state.genAdsList.results && state.genAdsList.results.filter(item => item.id !== action.payload) }) }
        default:
            return state
    }
}
