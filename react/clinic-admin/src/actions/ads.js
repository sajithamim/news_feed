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
        dispatch({
            type: 'GET_SPEC_USERS',
            payload: res.data,
        });
        return res;
    } catch (err) {
    }
}

export const postAdds = (state) => async (dispatch) => {
    try {
        const res = await Ads.postAdds(state);
        console.log("add res",res);
        dispatch({
            type: 'POST_ADD',
            payload: res.data,
        });
    } catch (err) {
    }
}

export const postAddsVisibilty = (state) => async (dispatch) => {
    try {
        const res = await Ads.postAddsVisibility(state);
        dispatch({
            type: 'POST_ADD_USER',
            payload: res.data,
        });
    } catch (err) {
    }
}