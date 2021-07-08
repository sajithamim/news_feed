
const initialState = {
  specList: [],
  subspecialization: [],
  updateData: false,
  addData: false,
  updateSubData: false,
  addSubData: false

};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RETRIEVE_SPECIALIZATION':
      return {...state , specList:action.payload, addData: false};
    case 'DELETE_SPECIALIZATION':
      return {...state , specList:Object.assign({}, state.specList, {results: state.specList && state.specList.results && state.specList.results.filter(item => item.id !== action.payload)})};
    case 'RETREIVE_SUB_SPECIALIZATION':
      return {...state , subspecialization: action.payload};
    case 'ADD_SPECIALIZATION':
      return {...state, addData: true}
    case 'EDIT_SPECIALIZATION':
      return {...state, updateData: true}
    case 'EDIT_SUB_SPECIALIZATION':
      return {...state, updateSubData: true}
    case 'ADD_SUB_SPECIALIZATION':
      return {...state, addSubData: true}
    case 'DELETE_SUB_SPECIALIZATION':
      return {...state , subspecialization: state.subspecialization && state.subspecialization.filter(item => item.id !== action.payload)};
    default:
      return state
  }
}

 // const objIndex = state.specList.results.findIndex(obj => obj.id === action.payload.id);
      // const updatedObj = { ...state.specList.results[objIndex], name: action.payload.name};
      // const updatedObjs = [...state.specList.results.slice(0, objIndex), updatedObj, ...state.specList.results.slice(objIndex + 1),];