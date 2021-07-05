
const initialState = {
  specialization: {},
  subspecialization: []

};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RETRIEVE_SPECIALIZATION':
      return {...state , specialization:action.payload};
    case 'RETREIVE_SUB_SPECIALIZATION':
      return {...state , subspecialization: action.payload};
    case 'ADD_SUB_SPECIALIZATION':
      return {...state, subspecialization: [...state.subspecialization, action.payload]}
    default:
      return state
  }
}

