const userLocation = (state = {lat: 0, lng: 0}, action) => {
  switch (action.type) {
  case 'UPDATE_USER_LOCATION':
    return action.payload;
  default:
    return state;
  }
};

export default userLocation;