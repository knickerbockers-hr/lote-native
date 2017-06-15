import store from './store';
import socket from './socket';
import BGService from './lib/BGService';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: (notification) => {
    console.log('NOTIFICATION: ', notification);
  }, 

  requestPermissions: true
});

const BGInstance = BGService.getInstance();
const locationManager = BGInstance.getPlugin();

locationManager.on('location', (location) => {
  store.dispatch({
    type: 'UPDATE_USER_LOCATION',
    payload: {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    }
  });
});

locationManager.on('geofence', (geofence) => {
	console.log('hello geofence');
  PushNotification.localNotification({
    title: 'Incoming Lote',
    message: geofence.extras.lote.lote.message || 'Ooops',
    playSound: true
  });

  locationManager.removeGeofence(geofence.identifier, 
    () => { console.log('fence removed') },
  	() => { console.log('removal failer'); });
});

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

export default locationManager; // not actually useful
