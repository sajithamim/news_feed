import quiz from "../services/quiz";

export const postQuiz = (state) => async (dispatch) => {
    try {
        console.log("response" , state);
        const res = await quiz.postQuiz(state);
            dispatch({
                type: 'POST_QUIZ',
                payload: res.data,
            });
            return res;
    } 
    catch (err) {
    }
}
export const getQuiz = (page) => async (dispatch) => {
    page = page != undefined ? page : 1;
    try {
        const res = await quiz.getAllQuiz(page);
        console.log("getQuiz" , res);
        dispatch({
            type: 'GET_QUIZ',
            payload: res.data,
            page: page
        })
    } catch (err) {
        console.log(err);
    }
}

export const deleteQuiz = (id) => async (dispatch) => {
    try {
        const res = await quiz.deleteQuiz(id);
        dispatch({
            type: 'DELETE_QUIZ',
            payload: id,
        });
        return res;

    }
    catch (err) {
        return err;
    }
}

export const updateQuiz = (id, state) => async (dispatch) => {
    try {
        const res = await quiz.updateQui(id, state);
        console.log("show quiz edit" , res);
        dispatch({
            type: 'EDIT_QUIZ',
            payload: res.data,
        })
        return res;
    } catch (err) {
        console.log(err);
    }
}
