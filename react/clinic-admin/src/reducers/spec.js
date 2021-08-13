
const initialState = {
  specList: [],
  subspecialization: [],
  addData: false,
  updateData: false,
  addSubData: false,
  updateSubData: false,
  image: {},
  subSpecImage:{}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RETRIEVE_SPECIALIZATION':
      return {...state , specList:action.payload, addData: false, updateData: false};
    case 'RETREIVE_SUB_SPECIALIZATION':
      return {...state , subspecialization: action.payload , addSubData:false , updateSubData: false};
    case 'DELETE_SPECIALIZATION':
      return {...state , specList:Object.assign({}, state.specList, {results: state.specList && state.specList.results && state.specList.results.filter(item => item.id !== action.payload)})}
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
    case 'ADD_IMAGE': 
      return {...state, image: action.payload}
    case 'ADD_SUB_IMAGE':
      return {...state, subSpecImage: action.payload} 
    default:
      return state
  }
}
