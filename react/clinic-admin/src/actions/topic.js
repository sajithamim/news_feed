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

    try {
        const res = await Topic.postTopic(state);
        console.log("post res", res);
        if (res.data.id && form_data) {
            console.log('pdf')
            await Topic.putPdfdata(res.data.id, form_data);
            dispatch({
                type: 'POST_TOPIC',
                payload: res.data,
            })
        }
        if(res.data.id && image_data) {
            console.log('image_data')
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
