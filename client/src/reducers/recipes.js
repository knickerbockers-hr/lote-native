const recipes = (state = 0, action) => {
  switch (action.type) {
  case 'ADD_RECIPE' :
    //console.log('incrementing');
    return state + 1;
  default:
    return state;
  }
};

export default recipes;
