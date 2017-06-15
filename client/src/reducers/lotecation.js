const lotecation = (state = {lat: 0, lng: 0}, action) => {
  switch (action.type) {
  case 'UPDATE_LOTECATION':
    return action.payload;
  default:
    return state;
  }
};

export default lotecation;
