import Topic from "../services/Topic";

export const getTopic = () => async (dispatch) => {
    try {
        const res = await Topic.getTopic();
        dispatch({
            type: 'GET_TOPIC',
            payload: res.data,
        })
    } catch (err) {
        console.log(err);
    }
}

export const deleteTopic = (id) => async (dispatch) => {
    try {
        const res = await Topic.deleteTopic(id);
        dispatch({
            type: 'DELETE_TOPIC',
            payload: id,
        })
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const postTopic = (state, form_data) => async (dispatch) => {

    try {
        const res = await Topic.postTopic(state);
        console.log("post res", res);
        if (res.data.id && form_data) {
            await Topic.putPdfdata(res.data.id, form_data);
            dispatch({
                type: 'POST_TOPIC',
                payload: res.data,
            })
        }
    } catch (err) {
        console.log(err);
    }
}
