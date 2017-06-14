const lotes = (state = [], action) => {
  switch (action.type) {
  case 'ADD_LOTES' :
    console.log('adding lotes to store');
    return action.lotes;
  case 'ONE_LOTE' :
    console.log('IN LOTES.JS', action.lote); 
  	let newState = state.slice(); 
  	newState.push(action.lote); 
  	return newState; 
  default:
    return state;
  }
};

export default lotes;
