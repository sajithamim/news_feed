import  genAds from "../services/genAds"
import DataService from "../services/data.service";

export const getGeneralAdvertisment = (page) => async (dispatch) => {
    page = page != undefined ? page : 1;
    try{
        const res = await genAds.getGenAds(page);
        dispatch({
            type: 'GET_GEN_ADS',
            payload: res.data,
            page: page
        });
    }catch(err){

    }
}
export const postGeneralAdvertisement = (state , imgData) => async (dispatch) => {
     try{
        const url = `add/alluseradd/`;
        const res = await DataService.addData(url, state);
        if(res.status == 201){
            if (imgData){
                let url = `${process.env.REACT_APP_API_URL}add/alluseradd/${res.data.id}/image/`;
                await genAds.putAdsImage(res.data.id, imgData);
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
export const deleteGenAds = (id) => async(dispatch) => {
    try{
        const res = await genAds.deleteGenAds(id);
        dispatch({
            type: 'DELETE_GEN_ADS',
            payload: id,
        })
    }catch(err){
        console.log("error");
    }
}

export const updateGeneralAdvertisment = (id, newData, form_data) => async(dispatch) => {
    try{
        const url = `add/alluseradd/${id}`;
        const res = await DataService.updateData(url, newData);
        if(res.status == 200){
            if (form_data){
                await genAds.putAdsImage(res.data.id, form_data);
            }
            dispatch({
                type: 'UPDATE_GEN_ADS',
                message: 'Publication added successfully.',
                data: res.data
            });
        } else {
            dispatch({
                type: 'HANDLE_ERROR',
                message: 'Some errors occured.',
            })
        }
    } catch(err) {
        console.log("error");
    }
}
