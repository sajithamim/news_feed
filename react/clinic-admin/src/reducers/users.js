const initialState= {
    userList:[],
    userCategory:[],
    userSpec:[],
    userDetails:[],
    userProfile:[],
    qualifications:[],
    publicationList:[],
    addPublicationDetails:[]
};

const users = (state = initialState , action) => {
    switch(action.type) {
        case 'GET_USER':
        return {...state , userList: action.payload , page: action.page}
        case 'GET_USER_CATEGORY':
        return {...state , userCategory: action.payload }
        case 'GET_USER_SPEC':
        return {...state , userSpec: action.payload }
        case 'GET_USER_DETAILS':
        return {...state , userDetails: action.payload }
        case 'DELETE USER':
        return {...state , userList: Object.assign({}, state.userList , {data: state.userList && state.userList.data && state.userList.data.filter(item => item.id !== action.payload)})}
        case 'POST_USER_PROFILE':
        return {...state , userProfile:action.payload }
        case 'GET_USER_PROFILE':
        return {...state , userProfile:action.payload }
        case 'GET_QUALIFICATIONS':
        return {...state , qualifications:action.payload }
        case 'GET_PUBLICATION_LIST':
        return {...state , publicationList:action.payload }
        case 'POST_PUBLICATION_LIST':
        return {...state , addPublicationDetails:action.payload }
        default: 
        return state;
    }
}
export default users;