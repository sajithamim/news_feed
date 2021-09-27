const initialState = {
    quizList: [],
    addData: false,
    updateData: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_QUIZ':
            console.log("quizList");
            return { ...state, quizList:action.payload, addData: false, updateData: false, page: action.page };
        case 'POST_QUIZ':
            console.log("addData");
            return {...state, addData: true, quizList: Object.assign({}, state.quizList, {results: [...state.quizList.results, action.payload , ]})};

        default:
            return state;
    }
}
