import DataService from "../services/data.service";

export const postQuiz = (state) => async (dispatch) => {
    try {
        console.log("response" , state);
        const url = "spec/quiz/"
        const res = await DataService.addData(url , state);
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
        const url = `spec/quiz?page=${page}`
        const res = await DataService.getData(url);
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
        const url = `spec/quiz/${id}`
        const res = await DataService.deleteData(url);
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

export const updateQuiz = (id, state, form_data) => async (dispatch) => {
    try {
        const url = `spec/quiz/${id}/`;
        const res = await DataService.updateData(url, state, form_data);
        dispatch({
            type: 'EDIT_QUIZ',
            payload: res.data,
        })
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const getSpecialization = () => async (dispatch) => {
    console.log("coming spec");
    try {
        const url = "spec/getspec/"
        const res = await DataService.getData(url);
        console.log("resghghghg",res);
        dispatch({
            type: 'GET_SPECIALIZATION',
            payload: res.data,
        })
    } catch (err) {
        console.log(err);
    }
}

export const getSubSpecialisation = (id) => async (dispatch) => {
    try {
        const url = `spec/specialization/${id}/spubspec_list`
        const res = await DataService.getData(url);
        dispatch({
            type: 'RETREIVE_SUB_SPECIALIZATION',
            payload: res.data,
        });
    } catch (err) {
    }
}