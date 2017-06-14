const activeLoteId = (state = 0, action) => {
  switch (action.type) {
  case 'SET_ACTIVE_LOTE_ID': 
    return action.activeLoteId;
  default:
    return state;
  }
};

export default activeLoteId;
