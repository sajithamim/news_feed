import Topic from "../services/Topic";
import DataService from "../services/data.service";

export const getTopic = (page) => async (dispatch) => {
    page = page != undefined ? page : 1;
    try {
        const url = `topic/topic/?page=${page}`;
        const res = await DataService.getData(url);
        dispatch({
            type: 'GET_TOPIC',
            payload: res.data,
            page: page
        })
    } catch (err) {
        dispatch({
            type: 'HANDLE_ERROR',
            message: 'Some errors occured.',
        })
    }
}

export const getSpecialization = () => async (dispatch) => {
    try {
        const res = await Topic.getSpecialization();
        dispatch({
            type: 'GET_SPECIALIZATION',
            payload: res.data,
        })
    } catch (err) {
        console.log(err);
    }
}

export const getCategory = () => async (dispatch) => {
    try {
        const res = await Topic.getCategory();
        dispatch({
            type: 'GET_CATEGORY',
            payload: res.data,
        })
    } catch (err) {
        console.log(err);
    }
}

export const deleteTopic = (id, page) => async (dispatch) => {
    try {
        const deleteUrl = `topic/topic/${id}`;
        const deleteRes = await DataService.deleteData(deleteUrl);
        const getUrl = `topic/topic/?page=${page}`;
        const dataRes = await DataService.getData(getUrl);
        dispatch({
            type: 'DELETE_TOPIC',
            payload: dataRes.data,
            page: page,
            message: 'Topic deleted successfully.',
        })
    } catch (err) {
        dispatch({
            type: 'HANDLE_ERROR',
            message: 'Some errors occured.',
        })
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

export const postTopic = (state, form_data, form_data_back , form_data2, form_data3, image_data) => async (dispatch) => {
    state.topic_audience = "doctor";
    try {
        const url = `topic/topic/`;
        const res = await DataService.addData(url, state);
        if(res.status == 201){
            if (res.data.id && form_data) {
                await Topic.putPdfdata(res.data.id, form_data);
            }
            if(res.data.id && form_data_back) {
                await Topic.putPdfdata2(res.data.id, form_data_back);
            }
            if(res.data.id && form_data2) {
                await Topic.putPdfdata(res.data.id, form_data2);
            }
            if(res.data.id && form_data3) {
                await Topic.putPdfdata(res.data.id, form_data3);
            }
            if(res.data.id && image_data) {
                image_data.append('topic_id', res.data.id);
                await Topic.putImagedata(image_data); 
            }
            dispatch({
                type: 'POST_TOPIC',
                message: 'Topic added successfully.',
                data: res.data,
            })    
        }else{
            dispatch({
                type: 'HANDLE_ERROR',
                message: 'Some errors occured.',
            })
        }
    } catch (err) {
        dispatch({
            type: 'HANDLE_ERROR',
            message: 'Some errors occured.',
        })
    }
}

export const updateTopic = (id, newData, form_data,form_data_back, form_data2, form_data3, image_data) => async (dispatch) => {
    newData.topic_audience = "doctor";
    try {
        const url = `topic/topic/${id}/`;
        const res = await DataService.updateData(url, newData);
        if(res.status == 200) {
            if (form_data !== null)
                await Topic.putPdfdata(id, form_data);
            if(form_data_back)
                await Topic.putPdfdata2(id, form_data_back);
            if(form_data2)
                await Topic.putPdfdata2(id, form_data2);
            if(form_data3)
                await Topic.putPdfdata2(id, form_data3);
            if(image_data !== null) {
                image_data.append('topic_id', id);
                await Topic.putImagedata(image_data);
            }
            dispatch({
                type: 'UPDATE_TOPIC',
                message: 'Topic updated successfully.',
                data: res.data
            })
        } else {
            dispatch({
                type: 'HANDLE_ERROR',
                message: 'Some errors are occured.',
            })
        }
    } catch (err) {
        dispatch({
            type: 'HANDLE_ERROR',
            message: 'Some errors are occured.',
        })
    }
}

export const searchUsers = (value) => async(dispatch) => {
    try{
        const res = await Topic.searchUsers(value);
        return res;
        // dispatch({
        //     type: 'SEARCH_USERS',
        //     payload: res.data,
        // })
    }catch (err) {

    }
}
