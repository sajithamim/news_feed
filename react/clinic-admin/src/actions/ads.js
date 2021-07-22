import Ads from "../services/Ads"

export const getAds = () => async (dispatch) => {
    try {
        const res = await Ads.getAds();
        dispatch({
            type: 'GET_ADS',
            payload: res.data,
        });
    } catch (err) {
    }
}

export const deleteAdd = (id) => async (dispatch) => {
    try {
        const res = await Ads.deleteAds(id);
        console.log("add res",res);
        dispatch({
            type: 'DELETE_ADS',
            payload: res.data,
        });
    } catch (err) {
    }
}