import  genAds from "../services/genAds"

export const getGeneralAdvertisment = (page) => async (dispatch) => {
    page = page != undefined ? page : 1;
    console.log("pAGE AC", page);
    try{
        const res = await genAds.getGenAds(page);
        console.log("response" , res);
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
        const res = await genAds.postGenAds(state);
        if(res && res.data && res.data.id){
            if (imgData){
                 await genAds.putAdsImage(res.data.id, imgData);
            }
            dispatch({
                type: 'POST_GEN_ADS',
                payload: res.data,
            });
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
        const res = await genAds.updateGeneralAdvertisment(id, newData);
        console.log("update_adds", res)
        if(res && res.data && res.data.id){
            if (form_data){
                await genAds.putAdsImage(res.data.id, form_data);
            }
        } 
        dispatch({
            type: 'UPDATE_GEN_ADS',
            payload:res.data,
        });
    }catch(err){
        console.log("error");
    }
}
