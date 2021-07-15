import Topic  from "../services/Topic";

export const getTopic = () => async(dispatch) => {
    try{
        const res = await Topic.getTopic();
        dispatch({
            type: 'GET_TOPIC',
            payload: res.data,
        })
    }catch (err) {
        console.log(err);
    }
}

export const deleteTopic = (id) => async(dispatch) => {
    try{
        const res = await Topic.deleteTopic(id);
        dispatch({
            type: 'DELETE_TOPIC',
            payload: res.data,
        })
    }catch (err) {
        console.log(err);
    }
}

export const postTopic = (state) => async(dispatch) => {
   
    try{
        const res = await Topic.postTopic(state);
        dispatch({
            type: 'POST_TOPIC',
            payload: res.data,
        })
    }catch (err) {
        console.log(err);
    }
}