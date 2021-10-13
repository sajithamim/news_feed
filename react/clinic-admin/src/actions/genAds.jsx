import DataService from "../services/data.service";

export const getGeneralAdvertisment = (page) => async (dispatch) => {
    console.log('page', page)
    page = page != undefined ? page : 1;
    try{
        const url = `add/alluseradd?page=${page}`;
        const res = await DataService.getData(url);
        dispatch({
            type: 'GET_GEN_ADS',
            payload: res.data,
            page: page
        });
    }catch(err){

    }
}

export const deleteGenAds = (id, page) => async(dispatch) => {
    try{
        const deleteUrl = `add/alluseradd/${id}`;
        const deleteRes = await DataService.deleteData(deleteUrl);
        const getUrl = `add/alluseradd?page=${page}`;
        const dataRes = await DataService.getData(getUrl);
        dispatch({
            type: 'DELETE_GEN_ADS',
            payload: dataRes.data,
            page: page,
            message: 'General Advertisement deleted successfully.',
        })
    }catch(err){
        dispatch({
            type: 'HANDLE_ERROR',
            message: 'Some errors are occured.',
        })
    }
}

export const postGeneralAdvertisement = (state , imgData) => async (dispatch) => {
     try{
        const url = `add/alluseradd/`;
        const res = await DataService.addData(url, state);
        if(res.status == 201){
            if (imgData){
                let url = `${process.env.REACT_APP_API_URL}add/alluseradd/${res.data.id}/image/`;
                await DataService.postImage(url, imgData);
            }
            dispatch({
                type: 'POST_GEN_ADS',
                message: 'General Advertisement added successfully.',
                data: res.data
            });
        } else {

        }
     } catch(err) {

     }
}

export const updateGeneralAdvertisment = (id, newData, form_data) => async(dispatch) => {
    try{
        const url = `add/alluseradd/${id}/`;
        const res = await DataService.updateData(url, newData);
        if(res.status == 200){
            if (form_data && res.data.id){
                const imageUrl = `${process.env.REACT_APP_API_URL}add/alluseradd/${res.data.id}/image/`;
                await DataService.postImage(imageUrl, form_data);
            }
            dispatch({
                type: 'UPDATE_GEN_ADS',
                message: 'General Advertisement updated successfully.',
                data: res.data
            });
        } else {
            dispatch({
                type: 'HANDLE_ERROR',
                message: 'Some errors are occured.',
            })
        }
    } catch(err) {
     
    }
}
