import Feedback from "../services/Feedback"

export const getFeedback = (page) => async (dispatch) => {
    try {
        const res = await Feedback.getFeed(page);
        console.log("feedback response" , res);
        dispatch({
            type: 'GET_FEEDBACK',
            payload: res.data,
        });
    } catch (err) {
    }
}