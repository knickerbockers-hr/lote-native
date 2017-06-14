import React, { Component } from 'react';
import Moment from 'moment';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Header } from './common';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chat: {
    display: 'flex',
  },
  senderStyle: {
    backgroundColor: '#afd9e0',
    marginTop: 5,
    padding: 10,
    position: 'relative',
    alignItems: 'flex-end',
  },
  receiverStyle: {
    backgroundColor: '#ffff99',
    marginTop: 5,
    padding: 10,
    position: 'relative',
  },
  loteDisplay: {
    paddingTop: 20,
    fontSize: 1.5
  },
  forward: {
    paddingTop: 10,
  },
  loteDisplaySenderStyle: {
    backgroundColor: '#afd9e0',
    padding: 10,
    position: 'relative',
    alignItems: 'center',
    // clear: both,
  },
  loteDisplayReceiverStyle: {
    backgroundColor: '#ffff99',
    padding: 10,
    position: 'relative',
    alignItems: 'center',
  },
  loteMessage: {
    fontSize: 1.2,
  },
  loteTimeStamp: {
    color: '#777',
    alignItems: 'flex-end',
  },
  lotecationDetails: {
    paddingBottom: 15,
    alignItems: 'center',
  }
});

class Lote extends Component {
  static navigationOptions = {
    tabBarLabel: 'Contacts',
    tabBarIcon: () => (<Icon size={24} color="white" name="contacts" />),
  }

  componentWillMount() {
    this.props.setActivePage('Lote');
  }

  componentDidMount() {
    console.log ('lote active lote id', this.props.activeLoteId);
    // this.props.setActiveLoteId(this.props.a);
    // if (this.props.lotes.length > 0) {
    //   this.props.lotes.forEach(lote => {
    //     if (lote.id === parseInt(this.props.activeLoteId)) {
    //       this.props.setActiveLote(lote);
    //     }
    //   });
    // }
  }

  componentWillUnmount() {
    console.log ('unmounting lote');
    this.props.setActiveLoteId(null);
    this.props.setActiveLote(null);
  }

  render() {
    let p = this.props;
    const mapProps = {
      history: p.history,
      location: p.location,
      lotecation: p.lotecation,
      userLocation: p.userLocation,
      updateLotecation: p.updateLotecation,
      searchBox: this.searchBox
    };

    return (
      <View className={'newLoteContainer'}>
        <Header
          headerText={
            this.props.activeContact.display
              ? this.props.activeContact.display
              : this.props.activeContact.email
          }
          { ...this.props }
          backButton={ true }
        />
          <View>
            <View style={ styles.container }>
              <View style={ styles.loteDisplay }>
                <Text>
                   <Text style={ styles.container }>
                    { this.props.activeLote && this.props.activeLote.loteSender.display }
                  </Text>
                   <Icon name='arrow-forward' size={10} color="black" />
                  <Text>
                    { this.props.activeLote && this.props.activeLote.lotesReceived[0].loteReceiver.display }
                  </Text>
                </Text>
              </View>
                <View style={ (this.props.activeLote && (this.props.activeLote.loteSender.id === this.props.profile.id)) ?
                  styles.loteDisplaySenderStyle : styles.loteDisplayReceiverStyle }>
                  <View style={ styles.loteMessage }>
                    <Text>
                      { this.props.activeLote && this.props.activeLote.lote.message }
                    </Text>
                  </View>
                  <View style={ styles.loteTimeStamp }>
                   <Text>
                    { this.props.activeLote && Moment(this.props.activeLote.created_at).format('LLLL') }
                    </Text>
                  </View>
                  <View style={ styles.lotecationDetails }>
                    <Text>
                      Lat/Lng: { this.props.activeLote && this.props.activeLote.location.latitude }/{ this.props.activeLote && this.props.activeLote.location.longitude }
                    </Text>
                    <Text>
                      Radius: { this.props.activeLote && this.props.activeLote.radius + ' meters'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
    );
  }
}

export default Lote;
