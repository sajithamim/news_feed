
const initialState = {
  specList: [],
  subspecialization: [],
  updateData: false,
  addData: false,
  updateSubData: false,
  addSubData: false,
  image: {},
  subSpecImage:{}
};

export default (state = initialState, action) => {
  console.log("ADD_SUB_IMAGE" , action.payload);
  switch (action.type) {
    case 'RETRIEVE_SPECIALIZATION':
      return {...state , specList:action.payload, addData: false, updateData: false};
    case 'DELETE_SPECIALIZATION':
      return {...state , specList:Object.assign({}, state.specList, {results: state.specList && state.specList.results && state.specList.results.filter(item => item.id !== action.payload)})};
    case 'RETREIVE_SUB_SPECIALIZATION':
      return {...state , subspecialization: action.payload , updateSubData: false , addSubData:false};
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
