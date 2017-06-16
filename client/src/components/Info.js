import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from './common';
import GeolocationExample from './GeolocationExample';

class Info extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Info',
    tabBarIcon: () => (<Icon size={24} color="white" name="info-outline" />)
  }

  render() {
    return (
      <View>
        <Header headerText='Info' { ...this.props } />
        <Text style={{ marginTop: 10 }}>{ this.props.profile.display }</Text>
        <GeolocationExample />
      </View>
    );
  }
}

export default Info;
