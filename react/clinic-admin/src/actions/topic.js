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
        console.log("response", res);    
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
                let pdfUrl = `topic/topic/${res.data.id}/pdf/`;
                const frontPdfRes = await  DataService.uploadDoc(pdfUrl, form_data);
                res.data.pdf = frontPdfRes.data.pdf;
            }
            if(res.data.id && form_data_back) {
                let backPdfUrl = `topic/topic/${res.data.id}/secondpdf/`;
                const backPdfRes = await  DataService.uploadDoc(backPdfUrl, form_data_back);
                res.data.pdfsecond = backPdfRes.data.pdfsecond;
            }
            if(res.data.id && form_data2) {
                let pdfUrl = `topic/topic/${res.data.id}/pdf/`;
                const pdfSecondRes = await  DataService.uploadDoc(pdfUrl, form_data2);
                res.data.pdf = pdfSecondRes.data.pdf;
            }
            if(res.data.id && form_data3) {
                let thirdPdfUrl = `topic/topic/${res.data.id}/pdf/`;
                const pdfThirdRes = await  DataService.uploadDoc(thirdPdfUrl, form_data3);
                res.data.pdf = pdfThirdRes.data.pdf;
            }
            if(res.data.id && image_data) {
                image_data.append('topic_id', res.data.id);
                const imageUrl = `topic/topicimages/`;
                const imageRes = await DataService.imageUpload(imageUrl, image_data); 
                res.data.topic_image = imageRes.data;
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
            if (form_data !== null) {
                await Topic.putPdfdata(id, form_data);
                let pdfUrl = `topic/topic/${id}/pdf/`;
                const frontPdfRes = await  DataService.uploadDoc(pdfUrl, form_data);
                res.data.pdf = frontPdfRes.data.pdf;
            } 
            if(form_data_back) {
                let backPdfUrl = `topic/topic/${id}/secondpdf/`;
                const backPdfRes = await  DataService.uploadDoc(backPdfUrl, form_data_back);
                res.data.pdfsecond = backPdfRes.data.pdfsecond;
            }
            if(form_data2) {
                let pdfUrl = `topic/topic/${id}/pdf/`;
                const pdfSecondRes = await  DataService.uploadDoc(pdfUrl, form_data2);
                res.data.pdf = pdfSecondRes.data.pdf;
            }
            if(form_data3) {
                let thirdPdfUrl = `topic/topic/${id}/pdf/`;
                const pdfThirdRes = await  DataService.uploadDoc(thirdPdfUrl, form_data3);
                res.data.pdf = pdfThirdRes.data.pdf;
            }
            if(image_data !== null) {
                image_data.append('topic_id', id);
                const imageUrl = `topic/topicimages/`;
                const imageRes = await DataService.imageUpload(imageUrl, image_data);
                const newImageRes = [...res.data.topic_image, ...imageRes.data];
                res.data.topic_image = newImageRes;
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
