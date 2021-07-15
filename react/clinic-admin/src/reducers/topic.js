const initialState= {
    topicList:[],
    postTopic: false
};

export default (state = initialState , action) => {
    console.log("reducer calling" , action.payload);
    switch(action.type) {
        case 'GET_TOPIC':
        return {...state , topicList: action.payload }
        case 'DELETE_TOPIC':
        return {...state , topicList: Object.assign({},state.topicList,{results: state.topicList && state.topicList.results.filter(item => item.id !== action.payload)}) }
        case 'POST_TOPIC':
        return {...state , postTopic: true }
        default: 
        return state;
    }
}
