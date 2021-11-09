const initialState= {
    topicList:[],
    success: '',
    error: '',
    pdf:{},
    userList:{},
    specList : {},
    catList:{},
};

const updateData = (state, action) => {
    let index = state.topicList && state.topicList.results.findIndex(item => item.id === action.data.id);
    state.topicList.results[index] = action.data;
    return {...state, success: action.message}
}

const addData = (state, action) => {
    state.topicList && state.topicList.results.splice(0, 0, action.data);
    return {...state, success: action.message}
}

export default (state = initialState , action) => {
    switch(action.type) {
        case 'GET_TOPIC':
            return {...state , topicList: action.payload,  page: action.page }
        case 'DELETE_TOPIC':
            return {...state, success: action.message, topicList: action.payload, page: action.page} 
        case 'POST_TOPIC':
            return addData(state, action)
        case 'DELETE_IMAGE':
        return {...state , topicList:action.payload}
        case 'UPDATE_TOPIC':
            return updateData(state, action)
        case 'HANDLE_ERROR':
        return { ...state , error: action.message}
        case 'GET_SPECIALIZATION':
        return { ...state , specList: action.payload}
        case 'GET_CATEGORY':
        return { ...state , catList: action.payload}
        case 'SEARCH_USERS':
        return { ...state , userList: action.payload}
        case 'RESET_DATA':
            return { ...state , success: '', error: ''}
        default: 
        return state;
    }
}
