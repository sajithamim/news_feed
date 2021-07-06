const initialState = {
    catlist: [],
    success: false,
    error: false

};


export default (state = initialState, action) => {
    switch (action.type) {
      case 'RETRIEVE_CATEGORY':
        return {...state , catlist:action.payload};
      case 'ADD_CATEGORY':
        return {...state, catlist: Object.assign({}, state.catlist, {results: [...state.catlist.results, action.payload]})};
        case 'DELETE_SUCCESS':
        return {...state, catlist: Object.assign({}, state.catlist, {results: state.catlist && state.catlist.results && state.catlist.results.filter(item => item.id !== action.payload)})};
      default:
        return state
    }
  }

