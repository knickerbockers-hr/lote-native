import React from 'react';
import { TextInput, View, Text, ScrollView, StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { Header } from './common';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import MapContainer from './MapContainer';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    //height: 100%,
    //width: 100%,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});

class Map extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'New Lote',
    tabBarIcon: () => (<Icon size={24} color="white" name="add-location" />)
  }

  render() {
    return (
      <View style={styles.container}>
        <MapContainer style={styles.container}/>
        <Header headerText='New Lote' { ...this.props } />
      </View>
    )
  }
}

export default Map