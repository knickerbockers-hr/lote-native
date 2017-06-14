const profile = (state = {}, action) => {
  switch (action.type) {
  case 'SET_PROFILE' :
    //console.log('setting profile');
    return action.profile;
  default:
    return state;
  }
};

export default profile;
