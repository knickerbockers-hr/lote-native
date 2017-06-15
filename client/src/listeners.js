const Store = require('./store');
const socket = require('./socket');
const BGService = require('./lib/BGService');
const BGSettings = require('./lib/BGSettingsConfig');
const PushNotification = require('react-native-push-notification');
let store = Store.default;

PushNotification.configure({
  onNotification: (notification) => {
    console.log('NOTIFICATION: ', notification);
  }, 

  requestPermissions: true
});



const bgGeo = BGService.getInstance();

const locationManager = bgGeo.getPlugin();

locationManager.configure(BGSettings.Config, function(state) {
  console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

  if (!state.enabled) {
    locationManager.start(function() {
      console.log("- Start success");
    });
  }
});

locationManager.on('location', (pos) => {
  console.log('bg location', pos);
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

module.exports.socket = socket;
module.exports.locationManager = locationManager;

