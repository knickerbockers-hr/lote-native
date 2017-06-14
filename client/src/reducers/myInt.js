const myInt = (state = 0, action) => {
  switch (action.type) {
  case 'INCREMENT' :
    //console.log('incrementing');
    return state + 1;
  default:
    return state;
  }
};

export default myInt;
