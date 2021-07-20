const initialState = {
    catlist: [],
    success: false,
    error: false,
    addData: false,
    updateData: false
};


export default (state = initialState, action) => {
    switch (action.type) {
      case 'RETRIEVE_CATEGORY':
        return {...state , catlist:action.payload, addData: false, updateData: false};
      case 'ADD_CATEGORY':
        return {...state, addData: true, catlist: Object.assign({}, state.catlist, {results: [...state.catlist.results, action.payload , ]})};
        case 'DELETE_SUCCESS':
        return {...state, catlist: Object.assign({}, state.catlist, {results: state.catlist && state.catlist.results && state.catlist.results.filter(item => item.id !== action.payload)})};
        case 'EDIT_CATEGORY':
        return { ...state , updateData: true}
        case 'ADD_CAT_IMAGE':
        return { ...state , image: action.payload}
        default:
        return state
    }
  }

