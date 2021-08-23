const initialState = {
    advisoryMemberList: [],
    addAdvisory: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'RETRIEVE_ADVISORYMEMBERS':
            return { ...state, advisoryMemberList: action.payload }
        case 'POST_ADVISORYMEMBERS':
            return { ...state, addAdvisory: true }
        default: return state;
    }
}