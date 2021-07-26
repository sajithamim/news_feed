const initialState= {
    topicList:[],
    addTopic: false,
    editTopic: false,
    pdf:{}
};

export default (state = initialState , action) => {
    switch(action.type) {
        case 'GET_TOPIC':
        return {...state , topicList: action.payload, addTopic: false, editTopic: false }
        case 'DELETE_TOPIC':
        return {...state , topicList: Object.assign({},state.topicList,{results: state.topicList && state.topicList.results.filter(item => item.id !== action.payload)}) }
        case 'POST_TOPIC':
        return {...state , addTopic: true }
        case 'DELETE_IMAGE':
        return {...state , topicList:action.payload}
        case 'UPDATE_TOPIC':
            return { ...state , editTopic: true}
        default: 
        return state;
    }
}
