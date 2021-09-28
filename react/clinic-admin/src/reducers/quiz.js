const initialState = {
    quizList: [],
    addData: false,
    success: false,
    updateData: false
};


export default (state = initialState, action) => {
    console.log("Acton", action.payload);
    switch (action.type) {
        case 'GET_QUIZ':
            return { ...state, quizList: action.payload, addData: false, updateData: false, page: action.page};
        case 'DELETE_QUIZ':
            return { ...state, quizList: Object.assign({}, state.quizList, { results: state.quizList && state.quizList.results && state.quizList.results.filter(item => item.id !== action.payload) }) };
        case 'POST_QUIZ':
            return { ...state, addData: true, quizList: Object.assign({}, state.quizList, { results: [...state.quizList.results, action.payload,] }) };
        case 'EDIT_QUIZ':
            return { ...state , updateData: true , quizList: Object.assign({}, state.quizList, {results: [...state.quizList.results, action.payload , ]})};
        default:
            return state
    }
}


