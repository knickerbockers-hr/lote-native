const contacts = (state = [], action) => {
  switch (action.type) {
  case 'ADD_CONTACTS' :
    //console.log('adding contacts to store');
    return action.contacts;
  default:
    return state;
  }
};

export default contacts;
