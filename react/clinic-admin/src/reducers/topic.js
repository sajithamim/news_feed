const initialState= {
    topicList:[],
    addTopic: false,
    editTopic: false,
    pdf:{},
    successMsg: '',
    specList : {},
    catList:{}
};

export default (state = initialState , action) => {
    switch(action.type) {
        case 'GET_TOPIC':
        return {...state , topicList: action.payload, addTopic: false, editTopic: false , page: action.page }
        case 'DELETE_TOPIC':
        return {...state , topicList: Object.assign({},state.topicList,{results: state.topicList && state.topicList.results.filter(item => item.id !== action.payload)}) }
        case 'POST_TOPIC':
        return {...state , addTopic: true }
        case 'DELETE_IMAGE':
        return {...state , topicList:action.payload}
        case 'UPDATE_TOPIC':
        return { ...state , editTopic: true}
        case 'GET_SPECIALIZATION':
        return { ...state , specList: action.payload}
        case 'GET_CATEGORY':
        return { ...state , catList: action.payload}
        default: 
        return state;
    }
}
