const activeLote = (state = {}, action) => {
  switch (action.type) {
  case 'SET_ACTIVE_LOTE': 
    console.log ('setting active lote');
    return action.activeLote;
  default:
    return state;
  }
};

export default activeLote;
