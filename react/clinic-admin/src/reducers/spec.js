
const initialState = {
  specialization: {},
  subspecialization: {}

};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (action.type) {
    case 'RETRIEVE_SPECIALIZATION':
      return {...state , specialization:action.payload};
    case 'RETREIVE_SUB_SPECIALISATION':
      return {...state , subspecialization: action.payload};
    default:
      return state
  }
}

