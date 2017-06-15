import React from 'react';
import { View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from './common';
import { NavigationActions } from 'react-navigation';
import Moment from 'moment';

class MyProfile extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'My Profile',
    tabBarIcon: () => (<Icon size={ 24 } color="white" name="face" />)
  }

  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        var lastPosition = position;
        this.setState({lastPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 1}
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View>
        <Header headerText="My Profile" { ...this.props } />
        <View style={{ marginTop: 100, alignItems: 'center' }}>
          <Icon size={ 80 } color="#0092ff" name="face" />
          <Text style={{ marginTop: 10, fontSize: 30 }}>{ this.props.profile.display }</Text>
          <Text style={{ marginTop: 10, fontSize: 20 }}>{ this.props.profile.email }</Text>
          <Text style={{ marginTop: 10, marginBottom: 25 }}>Member Since: { Moment(this.props.profile.created_at).format('LL') }</Text>
          <Text style={{ marginTop: 10, fontSize: 18 }}>Lotes Sent: {
            this.props.lotes.filter((lote) => { return lote.sender_id === this.props.profile.id }).length
           }</Text>
          <Text style={{ marginTop: 10, fontSize: 18 }}>Lotes Received: {
            this.props.lotes.filter((lote) => { return lote.lotesReceived[0].loteReceiver.id === this.props.profile.id }).length
          }</Text>
          <Text style={{ marginTop: 10, fontSize: 15, marginTop: 25 }}>Current Location: { this.state.lastPosition.coords && this.state.lastPosition.coords.longitude } 
            /{ this.state.lastPosition.coords && this.state.lastPosition.coords.latitude }
          </Text>
        </View>
      </View>
    );
  }
}

export default MyProfile;
