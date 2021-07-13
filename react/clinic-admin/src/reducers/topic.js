const initialState= {
    topicList:[],
};

export default (state = initialState , action) => {
    switch(action.type) {
        case 'GET_TOPIC':
        return {...state , topicList: action.payload }
        default: 
        return state;
    }
}