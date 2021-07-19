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
        const res = await Topic.deleteTopic(id)
        if(res.data && res.data.id){
            await Topic.deleteImage(id);
            console.log("res");
        }
        dispatch({
            type: 'DELETE_IMAGE',
            payload: id,
        })
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const postTopic = (state, form_data, image_data) => async (dispatch) => {
    state.topic_audience = "doctor";
    try {
        const res = await Topic.postTopic(state);
        if (res.data.id && form_data) {
            await Topic.putPdfdata(res.data.id, form_data);
            dispatch({
                type: 'POST_TOPIC',
                payload: res.data,
            })
        }
        if(res.data.id && image_data) {
            image_data.append('topic_id', res.data.id);
            await Topic.putImagedata(image_data);
            dispatch({
                type: 'POST_TOPIC',
                payload: res.data,
            })
       }
        
    } catch (err) {
        console.log(err);
    }
}

export const updateTopic = (id, state, form_data, image_data) => async (dispatch) => {
    console.log("action state" , state);
    state.topic_audience = "doctor";
    console.log("form_data" , form_data);
    console.log("image_data" , image_data);
    try {
        const res = await Topic.updateTopic(id, state);
        if (res && form_data !== null) {
            await Topic.putPdfdata(id, form_data);
            dispatch({
                type: 'UPDATE_TOPIC',
                payload: res.data,
            })
        }
        if(res && image_data !== null) {
            image_data.append('topic_id', id);
            await Topic.putImagedata(id, image_data);
            dispatch({
                type: 'UPDATE_TOPIC',
                payload: res.data,
            })
       }
        
    } catch (err) {
        console.log(err);
    }
}
