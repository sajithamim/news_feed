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
        console.log("bitton res",res);
        dispatch({
            type: 'GET_SPEC_USERS',
            payload: res.data,
            id: id
        });
        return res;
    } catch (err) {
    }
}

export const postAdds = (state, id) => async (dispatch) => {
    console.log('id', id)
    const vData = state.selectedUsers;
    let addsData = {
        title: state.title,
        add_specialization: state.add_specialization
    }
    if(id === null) {
        try {
            const res = await Ads.postAdds(addsData);
            if (res && res.data && res.data.id) { 
                const userData = []
                vData.map(item => {
                    userData.push({ adsid: res.data.id, email: item.value, spec_id: state.specId })
                })
                await Ads.postAddsVisibility(userData)
            }
            dispatch({
                type: 'POST_ADD',
                payload: res.data.id
            });
            return res;
        }
        catch (err) {
        }
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
        console.log("getEditAdsDetailsresponse" ,res);
        const specid = res.data.add_specialization[0].spec_id.id ; 
        const res1 = await Ads.getAdsSelectedUser(id , specid);
        const res2 = await Ads.getSpecUsers(specid);
        console.log("getAdsSelectedUser" , res1.data);
        dispatch
        ({
            type: 'GET_ADS_DETALS',
            payload: res.data,
            userDetails: res1.data,
            selectedSpecid: specid,
            specUsers: res2.data
        });
    } catch (err) {
    }
}


export const getAdsSelectedUser = (adsId , specid) => async (dispatch) => {
    try {
        const res = await Ads.getAdsSelectedUser(adsId , specid);
        dispatch({
            type: 'GET_ADS_USER_DETAILS',
            payload: res.data,
        });
    } catch (err) {
    }
}