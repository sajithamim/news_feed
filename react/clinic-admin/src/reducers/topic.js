const initialState= {
    topicList:[],
    success: '',
    error: '',
    pdf:{},
    // successMsg: '',
    specList : {},
    catList:{}
};

export default (state = initialState , action) => {
    switch(action.type) {
        case 'GET_TOPIC':
        return {...state , topicList: action.payload, addTopic: false, editTopic: false, page: action.page }
        case 'DELETE_TOPIC':
        return {...state , topicList: Object.assign({},state.topicList,{results: state.topicList && state.topicList.results.filter(item => item.id !== action.payload)}) }
        case 'POST_TOPIC':
        let index = state.topicList && state.topicList.results.findIndex(item => item.id === action.data.id);
        state.topicList.results[index] = action.data;
        return {...state , success: action.message}
        case 'DELETE_IMAGE':
        return {...state , topicList:action.payload}
        case 'UPDATE_TOPIC':
        let index1 = state.topicList && state.topicList.results.findIndex(item => item.id === action.data.id);
        state.topicList.results[index1] = action.data;
        return { ...state , success: action.message}
        case 'HANDLE_ERROR':
        return { ...state , error: action.message}
        case 'GET_SPECIALIZATION':
        return { ...state , specList: action.payload}
        case 'GET_CATEGORY':
        return { ...state , catList: action.payload}
        default: 
        return state;
    }
}
