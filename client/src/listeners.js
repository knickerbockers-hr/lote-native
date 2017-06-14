import store from './store';
import socket from './socket';
import locationManager from './lib/BGService';
import iosPush from './lib/iosPush';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: (notification) => {
    console.log('NOTIFICATION: ', notification);
  }, 

  requestPermissions: true
});

locationManager.on("geofence", (geofence) => {
	console.log('hello geofence');
  PushNotification.localNotification({
    title: 'Incoming Lote',
    message: geofence.extras.lote.lote.message || 'Ooops',
    playSound: true
  });

  locationManger.removeGeofence(geofence.identifier, () => { console.log('fence removed') },
  	() => { console.log('removal failer'); });
});

let success = (pos) => {
  store.dispatch({
    type: 'UPDATE_USER_LOCATION',
    payload: {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    }
  });

  // socket.emit('location update', {
  //   lat: pos.coords.latitude,
  //   lng: pos.coords.longitude
  // });
};

let newLote = (lote) => {
  store.dispatch({
    type: 'ONE_LOTE', 
    lote
  });
};

socket.on('new message', function(data) {
  console.log('SOCKET RESPONSE IN LISTENERS.JS', data.data); 
  newLote(data.data); 
});

let error = (err) => {
  // possibly want some sort of red flag in header when tracking isn't working
  // to let you know when you aren't picking up lotes
  console.warn('Tracking error: ', err);
};

let options = {

};

export default navigator.geolocation.watchPosition(success, error, options);
