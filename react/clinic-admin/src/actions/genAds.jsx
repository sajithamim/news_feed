import  genAds from "../services/genAds"

export const getGeneralAdvertisment = () => async (dispatch) => {
    try{
        const res = await genAds.getGenAds();
        console.log("res",res);
        dispatch({
            type: 'GET_GEN_ADS',
            payload: res ,
        });
    }catch(err){

    }
}
export const postGeneralAdvertisement = (state , imgData) => async (dispatch) => {
    console.log("state", state);
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
