import React, { Component } from 'react';
import axios from 'axios';
import { TextInput, View, Text, StyleSheet, ScrollView } from 'react-native';
import CheckBox from 'react-native-checkbox';
import Dropdown, { Select, Option, OptionList } from 'react-native-selectme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from './common';
import { Container, Content, List, ListItem, Thumbnail, Body, Item, Input, Form, Button, Label, Picker } from 'native-base';
import MapView from 'react-native-maps';
import config from '../../../config/config.js';

const apiBaseUrl = config.API_BASE_URL;

class NewLote extends Component {
   static navigationOptions = {
    tabBarLabel: 'New Lote',
    tabBarIcon: () => (<Icon size={ 24 } color="white" name="add-location" />)
  }

  constructor(props) {
    super(props);
    
    this.state= {
      lock: false,
      radius: 90,
      selectedItem: undefined,
      recipientIndex: 0,
      radius: 20,
      results: {
        items: []
      }
    };

    this.handleRecipientChange = this.handleRecipientChange.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
    this.handleLockToggle = this.handleLockToggle.bind(this);
    this.onLearnMore = this.onLearnMore.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.placeRef = this.placeRef.bind(this);
  }

  componentWillMount() {
    this.props.setActivePage('New Lote');
  }

  handleRecipientChange (recipientIndex) {
    this.props.setActiveContact(this.props.contacts[recipientIndex]);
    this.setState({
      recipientIndex: recipientIndex
    });
  }

  handleRadiusChange (radius) {
    this.setState({
      radius: radius
    });
  }

  handleLockToggle(checked) {
    console.log('value of checkbox', checked);
    this.setState({ lock: checked });
  }

  onLearnMore() {
    return this.props.navigation.navigate('Map');
  }

  handleSubmit(event) {
    event.preventDefault();

  //UNCOMMENT THIS BLOCK WHEN READY FOR SOCKET
  //   let loteInfo = {
  //     senderId: this.props.profile.id, 
  //     receiverId: this.props.activeContact.id, 
  //     loteType: 'lotes_text', 
  //     radius: this.state.radius, 
  //     message: this.props.activeMessage,
  //     lock: this.state.lock,
  //     longitude: this.props.lotecation.lng || this.props.userLocation.lng,
  //     latitude: this.props.lotecation.lat || this.props.userLocation.lat
  //   }

  //   socket.emit('send message', loteInfo, (err, msg) => {
  //     if (err) {
  //       console.log(err); 
  //     } else {
  //       this.props.setActiveMessage(''); 
  //       //this.props.history.push('/lotes'); 
  //     }
  //   });
  // }


  //AXIOS.POST TO END OF THE METHOD IS FOR OLD POST REQUEST,
  //DELETE WHEN ADDING SOCKET FEATURE 
    axios.post(`${apiBaseUrl}/profiles/${this.props.profile.id}/lotes`, {
      senderId: this.props.profile.id,
      receiverId: this.props.activeContact.id,
      loteType: 'lotes_text',
      radius: this.state.radius,
      message: this.props.activeMessage,
      lock: this.state.lock,
      longitude: this.props.lotecation.lng || this.props.userLocation.lng,
      latitude: this.props.lotecation.lat || this.props.userLocation.lat
    })
    .then((res) => {
      this.props.setActiveMessage('');
      this.props.getLotes(this.props.profile.id);
      this.props.history.push('/lotes');
    })
    .catch((err) => {
      console.log (err);
    });

    return this.props.navigation.navigate('Map');
  }

  placeRef(ref) {
    this.searchBox = ref ? ref.input : null;
  }
  // this function is used for a form in the web app -- not sure yet on how to implement similarly here 
  // placeSubmit(event) {
  //   event.preventDefault();
  //   console.log(event);
  // }

  render() {
    const {lotecation, userLocation} = this.props;
    return (
      <Container>
        <Header headerText='New Lote' { ...this.props } />
        <Content>
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text>Select Recipient:</Text>
            <Picker
              supportedOrientations={ ['portrait','landscape'] }
              iosHeader="Recipient"
              mode="dropdown"
              selectedValue={ this.state.recipientIndex }
              onValueChange={ this.handleRecipientChange }>
              { this.props.contacts.map((contact, index) => {
                return (
                  <Picker.Item label={ contact.receiver.display ? contact.receiver.display : contact.receiver.email } key={ contact.receiver.id } value={ index } />
                )
              })}
            </Picker>
          </View>
          <View style={{ paddingTop:40 }}>
            <Item underline onChangeText={ (event) => this.props.setActiveMessage(event.target.value) }>
              <Input placeholder='Enter a message' />
            </Item>  
            <Item underline>
              <Input id="locationSearch" ref={ this.placeRef } placeholder='Location search' />
            </Item>
          </View>
          
          <View style={{ alignItems: "center", paddingTop:75, paddingBottom:25 }}>
            <Text>Select Radius:</Text>
            <Picker
              supportedOrientations={ ['portrait','landscape'] }
              iosHeader="Select Radius"
              mode="dropdown"
              selectedValue={ this.state.radius }
              onValueChange={ this.handleRadiusChange.bind(this) }>
              <Picker.Item value={ 20 } label="20 meters" />
              <Picker.Item value={ 100 } label="100 meters" />
              <Picker.Item value={ 500 } label="500 meters" />
              <Picker.Item value={ 2500 } label="2,500 meters" />
              <Picker.Item value={ 10000 } label="10,000 meters" />
            </Picker>
            <View style={{ padding:10 }}>
              <CheckBox
                label="Location-Locked"
                checked={ this.state.lock }
                onChange={ (checked) => this.handleLockToggle(!checked) }
              />
            </View>
            <View style={{ alignItems: 'center', marginTop:10 }}>
              <Button primary onPress={ this.handleSubmit }>
                <Text style={{ color:'white', fontSize:20 }}>Submit</Text>
              </Button>
            </View>  
          </View>  
        </Content>
      </Container>
    )
  }
}

export default NewLote;
