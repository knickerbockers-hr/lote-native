import React from 'react';
import ReactNative, { 
  AppRegistry,
  PermissionsAndroid } from 'react-native';
import { Provider } from 'react-redux';
import store from './client/src/store';
import listeners from './client/src/listeners';
import Nav from './client/src/components/Nav';
import BackgroundGeolocation from 'react-native-background-geolocation';

// Should ask for permissions on boot if android,
// might need to do in checker after app boot (better on home)
// async function requestLocationPermission() {
//   try {
//     const granted = await PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
//     if (granted) {
//       console.log("You can location")
//     } else {
//       console.log("Location permission denied")
//     }
//   } catch (err) {
//     console.warn(err)
//   }
// }

global.BackgroundGeolocation = BackgroundGeolocation;

const Lote = () => {
  return (
    <Provider store={store}>
       <Nav />
    </Provider>
  );
};

AppRegistry.registerHeadlessTask('BackgroundGeolocation', () => BackgroundGeolocationHeadlessService);

AppRegistry.registerComponent('loteNative', () => Lote);
