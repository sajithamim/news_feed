const initialState = {
    genAdsList:[],
    getGenAdsList:[],
}

export default (state = initialState , action) => {
    console.log("actio");
    switch(action.type) {
        case 'POST_GEN_ADS':
            return{...state , genAdsList:action.payload}
        case 'GET_GEN_ADS':
                return{...state , genAdsList:action.payload}
        default:
            return state;
    }
}