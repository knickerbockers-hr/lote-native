const axios = require('axios');
import config from '../../../config/config.js';
const apiBaseUrl = config.API_BASE_URL;

export const increment = () => {
  return {
    type: 'INCREMENT'
  };
};

export const loadingChanged = (isLoading) => {
  return {
    type: 'IS_LOADING',
    isLoading
  };
};

export const addLotesToStore = (lotes) => {
  return {
    type: 'ADD_LOTES',
    lotes
  };
};

export const addOneLote = (lote) => {
  return {
    type: 'ONE_LOTE',
    lote
  };
};

export const getLotes = (userId) => {
  console.log ('getting lotes');
  return function(dispatch, getState) {
    var state = getState();
    dispatch(loadingChanged(true));

    return axios.get(`${apiBaseUrl}/profiles/${userId}/lotes`)
      .then(function (res) {
        dispatch(loadingChanged(false));

        if (res.status === 200) {
          console.log (res);
          return res.data;
        }
        throw 'request failed';
      })
      .then(function (lotes) {
        console.log ('received lotes', lotes);
        dispatch(addLotesToStore(lotes));
        
        if (state.activeLoteId) {
          lotes.forEach(lote => {
            if (lote.id === parseInt(state.activeLoteId)) {
              dispatch(setActiveLote(lote));
            }
          });
        }
        // locationTree.clear();
        // // load points into r-tree
        // locationTree.load(lotes.map((lote) => {
        //   const {longitude, latitude} = lote.location;
        //   let point = new geopoint(latitude, longitude);
        //   // default radius half a mile until we have
        //   // radius on all lotes
        //   let radius = lote.radius || 0.5;
        //   let bbox = point.boundingCoordinates(radius, true);
        //   return {
        //     minX: bbox[0].longitude(),
        //     minY: bbox[0].latitude(),
        //     maxX: bbox[1].longitude(),
        //     maxY: bbox[1].latitude(),
        //     data: lote
        //   };
        // }));
      })
      .catch(function (err) {
        console.log (err);
      });
  };
};

export const addContactsToStore = (contacts) => {
  return {
    type: 'ADD_CONTACTS',
    contacts
  };
};

export const getContacts = (userId) => {
  console.log ('getting contacts');
  return function(dispatch, getState) {
    var state = getState();
    dispatch(loadingChanged(true));

    return axios.get(`${apiBaseUrl}/profiles/${userId}/contacts`)
      .then(function (res) {
        dispatch(loadingChanged(false));

        if (res.status === 200) {
          console.log (res);
          return res.data;
        }
        throw 'request failed';
      })
      .then(function (contacts) {
        console.log ('received contacts', contacts);
        dispatch(addContactsToStore(contacts));
      })
      .catch(function (err) {
        console.log (err);
      });
  };
};

export const setProfile = (profile) => {
  return {
    type: 'SET_PROFILE',
    profile
  };
};

export const getProfileByEmail = (email) => {
  console.log ('getting profile');
  return function(dispatch, getState) {
    var state = getState();
    dispatch(loadingChanged(true));

    return axios.get(`${apiBaseUrl}/profileByEmail/${email}`)
      .then(function (res) {
        dispatch(loadingChanged(false));

        if (res.status === 200) {
          console.log (res);
          return res.data;
        }
        throw 'request failed';
      })
  };
};

export const updateLotecation = (location) => {
  return {
    type: 'UPDATE_LOTECATION',
    payload: location
  };
};

export const updateUserLocation = (location) => {
  return {
    type: 'UPDATE_USER_LOCATION',
    payload: location
  };
};

export const setActivePage = (activePage) => {
  return {
    type: 'SET_ACTIVE_PAGE',
    activePage
  };
};

export const setActiveContact = (activeContact) => {
  return {
    type: 'SET_ACTIVE_CONTACT',
    activeContact
  };
};

export const setActiveMessage = (activeMessage) => {
  return {
    type: 'SET_ACTIVE_MESSAGE',
    activeMessage
  };
};

export const setActiveLoteId = (activeLoteId) => {
  return {
    type: 'SET_ACTIVE_LOTE_ID',
    activeLoteId
  };
};

export const setActiveLote = (activeLote) => {
  console.log ('setttttting active lote');
  return {
    type: 'SET_ACTIVE_LOTE',
    activeLote
  };
};

export const addRecipe = () => {
  return {
    type: 'ADD_RECIPE'
  };
};