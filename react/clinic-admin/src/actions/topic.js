import Topic from "../services/Topic";

export const getTopic = (page) => async (dispatch) => {
    page = page != undefined ? page : 1;
    try {
        const res = await Topic.getTopic(page);
        dispatch({
            type: 'GET_TOPIC',
            payload: res.data,
            page: page
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
        }
        dispatch({
            type: 'DELETE_TOPIC',
            payload: id,
        })
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const deleteImages = (id) => async (dispatch) => {
    try {
        const res = await Topic.deleteImage(id);        
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const postTopic = (state, form_data, form_data2, image_data) => async (dispatch) => {
    state.topic_audience = "doctor";
    try {
        const res = await Topic.postTopic(state);
        if (res.data.id && form_data) {
            await Topic.putPdfdata(res.data.id, form_data);
        }
        if(res.data.id && form_data2) {
            await Topic.putPdfdata2(res.data.id, form_data2);
        }
        if(res.data.id && image_data) {
            image_data.append('topic_id', res.data.id);
            await Topic.putImagedata(image_data); 
        }
        dispatch({
            type: 'POST_TOPIC',
            payload: res.data,
        })
        
    } catch (err) {
        console.log(err);
    }
}

export const updateTopic = (id, state, form_data, form_data2, image_data) => async (dispatch) => {
   
    state.topic_audience = "doctor";
    try {
        const res = await Topic.updateTopic(id, state);
        if (res && form_data !== null) {
            await Topic.putPdfdata(id, form_data);
        }
        if(res.data.id && form_data2) {
            await Topic.putPdfdata2(id, form_data2);
        }
        if(res && image_data !== null) {
            image_data.append('topic_id', id);
            await Topic.putImagedata(image_data);
        }
       dispatch({
            type: 'UPDATE_TOPIC',
            payload: res.data,
        })
        
    } catch (err) {
        console.log(err);
    }
}
