const initialState = {
    genAdsList:[],
    addGenAdd: false,
};

export default (state = initialState , action) => {
    switch(action.type) {
        case 'POST_GEN_ADS':
            return{...state , addGenAdd: true}
        case 'GET_GEN_ADS':
            return{...state , genAdsList:action.payload , page: action.page}
        case 'DELETE_GEN_ADS':
            return {...state , genAdsList: Object.assign({}, state.genAdsList, { results: state.genAdsList && state.genAdsList.results && state.genAdsList.results.filter(item => item.id !== action.payload) })  }
        default:
            return state
    }
}
