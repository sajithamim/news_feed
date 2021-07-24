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

export const getSpecUsers = (id) => async (dispatch) => {
    try {
        const res = await Ads.getSpecUsers(id);
        console.log("add res",res);
        dispatch({
            type: 'GET_SPEC_USERS',
            payload: res.data,
        });
    } catch (err) {
    }
}