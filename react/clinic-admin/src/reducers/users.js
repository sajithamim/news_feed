const initialState = {
    userList: [],
    userCategory: [],
    userSpec: [],
    userDetails: [],
    userProfile: [],
    qualifications: [],
    publicationList: [],
    addPublicationDetails: [],
    addPublicationData: false,
    updatePublicationData: false
};

const users = (state = initialState, action) => {
        if(action.type == 'DELETE_USER_PUBLICATION') {
            const list = Object.assign({}, state.publicationList, { data: state.publicationList && state.publicationList.data && state.publicationList.data.data && state.publicationList.data.data.filter(item => item.id !== action.payload) })
            console.log('list', list);
        }
    
    switch (action.type) {
        case 'GET_USER':
            return { ...state, userList: action.payload, page: action.page }
        case 'GET_USER_CATEGORY':
            return { ...state, userCategory: action.payload }
        case 'GET_USER_SPEC':
            return { ...state, userSpec: action.payload }
        case 'GET_USER_DETAILS':
            return { ...state, userDetails: action.payload }
        case 'DELETE USER':
            return { ...state, userList: Object.assign({}, state.userList, { data: state.userList && state.userList.results && state.userList.results.filter(item => item.id !== action.payload) }) }
        case 'POST_USER_PROFILE':
            return { ...state, userProfile: action.payload }
        case 'GET_USER_PROFILE':
            return { ...state, userProfile: action.payload }
        case 'GET_QUALIFICATIONS':
            return { ...state, qualifications: action.payload }
        case 'GET_PUBLICATION_LIST':
            return { ...state, publicationList: action.payload, addPublicationData: false, updatePublicationData:false }
        case 'POST_PUBLICATION_LIST':
            return { ...state, addPublicationData: true,  publicationList: Object.assign({}, state.publicationList, {results: [...state.publicationList.data.data , action.payload , ]}) }
        case 'UPDATE_PUBLICATION_LIST':
                return { ...state , updatePublicationData: true , publicationList: Object.assign({}, state.publicationList, {results: [...state.publicationList.data.data, action.payload , ]}) }
        case 'DELETE_USER_PUBLICATION':
            return { ...state, publicationList: Object.assign({}, state.publicationList, { data: state.publicationList && state.publicationList.data &&  state.publicationList.data.filter(item => item.id !== action.payload) }) }
        default:
            return state;
        
    }
}
export default users;