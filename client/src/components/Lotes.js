import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationActions } from 'react-navigation';
import { Header } from './common';
import Moment from 'moment';
import io from 'socket.io-client';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chat: {
    display: 'flex',
    marginTop: 10,
  },
  senderStyle: {
    backgroundColor: '#afd9e0',
    padding: 10,
    position: 'relative',
    marginTop: 5,
    marginRight: 20,
    marginBottom: 5,
    marginLeft: 20,
    alignSelf: 'flex-end',
  },
  receiverStyle: {
    backgroundColor: '#ffff99',
    padding: 10,
    position: 'relative',
    marginTop: 5,
    marginRight: 20,
    marginBottom: 5,
    marginLeft: 20,
    alignSelf: 'flex-start',

  },
});

class Lotes extends Component {  
  static navigationOptions = {
    tabBarLabel: 'Contacts',
    tabBarIcon: () => (<Icon size={24} color="white" name="contacts" />),
  }

  constructor (props) {
    super(props);
    this.forMoreDetails = this.forMoreDetails.bind(this);
  }

  forMoreDetails(loteId) {
    console.log('pressssssed', loteId);
    this.props.setActiveLoteId(loteId);

    if (this.props.lotes.length > 0) {
      console.log ('props length greater than 0');
      console.log ('active lote id', this.props.activeLoteId);
      this.props.lotes.forEach(lote => {
        console.log ('lote id', lote.id);
        if (lote.id === loteId) {
          console.log('found lote');
          this.props.setActiveLote(lote);
        }
      });
    }

    return this.props.navigation.navigate('Lote');
  }

  render() {
    let lotesDisplayCount = 0;
    // const { goBack } = this.props.navigation;
    return (
      <ScrollView>
        <Header
          headerText={
            this.props.activeContact.display
              ? this.props.activeContact.display 
              : this.props.activeContact.email
          }
          { ...this.props }
          backButton={ true }
        />
        <View style={ styles.chat }>
          { (this.props.activeContact.id !== this.props.profile.id)
            ? this.props.lotes.map((lote, i) => {
              if (lote.sender_id === this.props.activeContact.id || lote.lotesReceived[0].receiver_id === this.props.activeContact.id) {
                lotesDisplayCount++;
                if (lote.sender_id === this.props.profile.id) {
                  return (
                    <TouchableOpacity style={ styles.senderStyle } key={ lote.id } onPress={ () => { this.forMoreDetails(lote.id) } }>
                      <Text>{ lote.lote.message }</Text>
                      <Text>sent { Moment(lote.created_at).fromNow() }</Text>
                    </TouchableOpacity>
                  );
                } else if (lote.lotesReceived[0].receiver_id === this.props.profile.id) {
                  return (
                    <TouchableOpacity style={ styles.receiverStyle } key={ lote.id } onPress={ () => { this.forMoreDetails(lote.id) } }>
                      <Text>{ lote.lote.message }</Text>
                      <Text>sent { Moment(lote.created_at).fromNow() }</Text>                       
                    </TouchableOpacity>
                  );
                }
              }
            })
            : this.props.lotes.map((lote, i) => {
              if (lote.sender_id === this.props.profile.id && lote.lotesReceived[0].receiver_id === this.props.profile.id) {
                lotesDisplayCount++;
                return (
                  <TouchableOpacity style={ styles.senderStyle } key={ lote.id } onPress={ () => { this.forMoreDetails(lote.id) } }>
                    <Text>{ lote.lote.message }</Text>
                    <Text >sent { Moment(lote.created_at).fromNow() }</Text>
                  </TouchableOpacity>
                );
              }
            })
          }
        </View>
      </ScrollView>
    );
  }
}

export default Lotes;
