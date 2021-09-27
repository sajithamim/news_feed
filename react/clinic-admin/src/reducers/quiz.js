const initialState = {
    quizList: [],
    addData: false,
    updateData: false
};


export default (state = initialState, action) => {
    console.log("Acton" , action.payload);
    switch (action.type) {
        case 'GET_QUIZ':
            return { ...state, quizList: action.payload, addData: false, updateData: false };
        case 'POST_QUIZ':
            return { ...state, addData: true, quizList: Object.assign({}, state.quizList, { results: [...state.quizList.results, action.payload,] }) };
        default:
            return state
    }
}


