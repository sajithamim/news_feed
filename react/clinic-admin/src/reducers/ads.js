const initialState = {
    adsList:[],
    deleteList:[],
};


export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ADS':
        return {...state , adsList: action.payload}
        case 'DELETE_ADS':
        return {...state , deleteList: action.payload}
        default:
        return state
    }
  }

