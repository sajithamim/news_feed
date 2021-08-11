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
            id: id
        });
        return res;
    } catch (err) {
    }
}

export const postAdds = (newData, userList, adsId , imgData) => async (dispatch) => {
    try {
        if (adsId === undefined) {
            const res = await Ads.postAdds(newData);
            if (res && res.data && res.data.id) {
                const userData = []
                userList.map(item => {
                    userData.push({ adsid: res.data.id, spec_id: item.spec_id, user_id: item.id })
                })
                await Ads.postAdsImage(adsId, imgData)
                await Ads.postAddsVisibility(userData)
            dispatch({
                type: 'POST_ADD',
                payload: res.data.id
            });
        }
            return res;
        }
        else {
            const res = await Ads.putAdds(newData, adsId);
            if (userList && res && res.data && adsId) {
                const userData = []
                userList.map(item => {
                    userData.push({ adsid: adsId, spec_id: item.spec_id, user_id: null })
                })
               await Ads.postAddsVisibility(userData)
            }
            dispatch({
                type: 'POST_ADD',
                payload: res.data.id
            });
            return res;
        }
    }
    catch (err) {
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

export const getEditAdsDetails = (id) => async (dispatch) => {
    try {
        const res = await Ads.getEditAdsDetails(id);
        console.log("getEditAdsDetails", res);
        const specid = res.data.add_specialization[0].spec_id.id;
        const res1 = await Ads.getAdsSelectedUser(id, specid);
        const res2 = await Ads.getSpecUsers(specid);
        dispatch
            ({
                type: 'GET_ADS_DETALS',
                payload: res.data,
                userDetails: res1.data,
                selectedSpecid: specid,
                specUsers: res2.data
            });
        return res;
    } catch (err) {
    }
}


export const getAdsSelectedUser = (adsId, specid) => async (dispatch) => {
    try {
        const res = await Ads.getAdsSelectedUser(adsId, specid);
        dispatch({
            type: 'GET_ADS_USER_DETAILS',
            payload: res.data,
        });
    } catch (err) {
    }
}