const initialState = {
    catlist: [],
    success: false,
    error: false,
    updateData: false
};


export default (state = initialState, action) => {
  console.log("EDIT_CATEGORY" , action.payload);
    switch (action.type) {
      case 'RETRIEVE_CATEGORY':
        return {...state , catlist:action.payload};
      case 'ADD_CATEGORY':
        return {...state, catlist: Object.assign({}, state.catlist, {results: [...state.catlist.results, action.payload]})};
        case 'DELETE_SUCCESS':
        return {...state, catlist: Object.assign({}, state.catlist, {results: state.catlist && state.catlist.results && state.catlist.results.filter(item => item.id !== action.payload)})};
        case 'EDIT_CATEGORY':
        return { ...state , updateData: true}
        default:
        return state
    }
  }

