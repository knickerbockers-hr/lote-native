import React from 'react';
import { View, TouchableHighlight, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from './common';
import config from '../../../config/config.js';
import logo from '../../../public/assets/logo-full-square.png';

const BGService = require('../lib/BGService');
const bgGeo = BGService.getInstance();

const locationManager = bgGeo.getPlugin();

const PushNotification = require('react-native-push-notification');

class Home extends React.Component {
  
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: () => (<Icon size={24} color="white" name="home" />)
  }

  componentWillMount() {
    // user authentication
    var Auth0Lock = require('react-native-lock');
    var lock = new Auth0Lock({ clientId: config.AUTH0_LOCK_CLIENT_ID, domain: config.AUTH0_LOCK_DOMAIN });

    lock.show({}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      // Authentication worked!
      //console.log('Logged in with Auth0!');
      //console.log ('profile email', profile.email);
      this.props.getProfileByEmail(profile.email)
        .then((profile) => {
          //console.log('RESULT', profile);
          this.props.setProfile(profile);
          var user = profile;

          this.props.setActiveContact(user);
          this.props.getLotes(user.id);
          this.props.getContacts(user.id);
        })
        .catch(function (err) {
          console.log ('were here');
          console.log (err);
        });
    });
    console.log('mount home');

    // PushNotification.configure({
    //   onNotification: (notification) => {
    //     console.log('NOTIFICATION: ', notification);
    //   }, 

    //   requestPermissions: true
    // });



    // locationManager.on('geofence', (geofence) => {
    //   console.log('hello geofence');
    //   PushNotification.localNotification({
    //     title: 'Incoming Lote',
    //     message: geofence.extras.lote.lote.message || 'Ooops',
    //     playSound: true
    //   });

    //   store.dispatch({
    //     type: 'SET_ACTIVE_LOTE',
    //     payload: geofence.extras.lote
    //   });

    //   locationManager.removeGeofence(geofence.identifier, 
    //     () => { console.log('fence removed') },
    //     () => { console.log('removal failer'); });
    //   return this.props.navigation.navigate('Lote');
    // });

  }

  componentWillUnmount() {
    console.log('unmount home');
  }

  render() {
    return (
      <View>
        <Header headerText='Home' { ...this.props } />
        <Image source={logo} style={{ width:250, height:250, alignSelf: 'center', marginTop:100 }}/>
        <Text style={{ alignSelf: 'center', fontSize:20 }}>Location-based notes</Text>
      </View>
    );
  }
}

export default Home;
