const initialState= {
    topicList:[],
    postTopic: false,
    updateTopic: false,
    pdf:{}
};

export default (state = initialState , action) => {
    console.log('action.payload', action.payload)
    switch(action.type) {
        case 'GET_TOPIC':
        return {...state , topicList: action.payload }
        case 'DELETE_TOPIC':
        return {...state , topicList: Object.assign({},state.topicList,{results: state.topicList && state.topicList.results.filter(item => item.id !== action.payload)}) }
        case 'POST_TOPIC':
        return {...state , postTopic: true }
        case 'DELETE_IMAGE':
        return {...state , topicList:action.payload}
        case 'UPDATE_TOPIC':
            return { ...state , updateTopic: true}
        default: 
        return state;
    }
}
