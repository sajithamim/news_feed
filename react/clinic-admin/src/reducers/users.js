const initialState = {
    userList: [],
    addUser: false,
    updateUser: false,
    userCategory: [],
    userSpec: [],
    userDetails: [],
    userProfile: [],
    qualifications: [],
    publicationList: [],
    addPublicationDetails: [],
    addPublicationData: false,
    updatePublicationData: false,
    success: '',
    error: '',
};
const sessionout = () => {
  const clearToken = localStorage.clear();
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
}
const users = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER':
            return { ...state, userList: action.payload, addUser: false , updateUser: false, page: action.page }
        case 'GET_USER_CATEGORY':
            return { ...state, userCategory: action.payload }
        case 'GET_USER_SPEC':
            return { ...state, userSpec: action.payload }
        case 'GET_USER_DETAILS':
            return { ...state, userDetails: action.payload }
        case 'DELETE_USER':
            return {...state, success: action.message, userList: action.payload, page: action.page}
        case 'POST_USER_PROFILE':
            return { ...state, userProfile: action.payload }
        case 'GET_USER_PROFILE':
            return { ...state, userProfile: action.payload }
        case 'UPDATE_USER_PROFILE':
            return { ...state, updateUserData: true, userProfile: Object.assign({}, state.userProfile, { results: [...state.userProfile.data.data, action.payload,] }) }
        case 'GET_QUALIFICATIONS':
            return { ...state, qualifications: action.payload }
        case 'GET_PUBLICATION_LIST':
            return { ...state, publicationList: action.payload, addPublicationData: false, updatePublicationData: false }
        case 'POST_PUBLICATION_LIST': {
            if(action.data) {
                state.publicationList && state.publicationList.data.splice(0, 0, action.data);  
            }
            return { ...state, success: action.message }
        }
        case 'UPDATE_PUBLICATION_LIST': {
            let index1 = state.publicationList && state.publicationList.data.findIndex(item => item.id === action.data.id);
            state.publicationList.data[index1] = action.data;
            return { ...state, success: action.message }
        }
        case 'HANDLE_ERROR':
            return { ...state, error: action.message}
        case 'RESET_DATA':
            return { ...state , success: '', error: ''}
        case 'SESSION_OUT':
            return sessionout(state, action)
        case 'DELETE_USER_PUBLICATION':
            return { ...state, publicationList: Object.assign({}, state.publicationList, { data: state.publicationList && state.publicationList.data && state.publicationList.data.filter(item => item.id !== action.payload) }) }
        default:
            return state;

    }
}
export default users;