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
export const getQuiz = () => async (dispatch) => {
    try {
        const res = await quiz.getAllQuiz();
        console.log("getQuiz" , res);
        dispatch({
            type: 'GET_QUIZ',
            payload: res.data,
        })
    } catch (err) {
        console.log(err);
    }
}