import React from 'react';
import ReactNative, { 
  AppRegistry,
  PermissionsAndroid } from 'react-native';
import { Provider } from 'react-redux';
import store from './client/src/store';
import listeners from './client/src/listeners';
import Nav from './client/src/components/Nav';
import BackgroundGeolocation from 'react-native-background-geolocation';
import BGHeadlessService from './client/src/lib/BGHeadlessService';

// Android asks for permissions on as needed, 
// we start tracking right away
async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'LoteNative Location Tracking Permission',
        'message': 'LoteNative tracks where you are so that we know when to notify you of Lotes'
      });
    if (granted) {
      console.log("Location permission granted");
    } else {
      console.log("Location permission denied");
    }
  } catch (err) {
    console.warn(err)
  }
}

global.BackgroundGeolocation = BackgroundGeolocation;

class Lote extends React.Component {

  componentDidMount() {
    requestLocationPermission();
  }

  render() {
    return (
      <Provider store={store}>
         <Nav />
      </Provider>
    );
  }
}

AppRegistry.registerHeadlessTask('BackgroundGeolocation', () => BGHeadlessService);

AppRegistry.registerComponent('loteNative', () => Lote);
