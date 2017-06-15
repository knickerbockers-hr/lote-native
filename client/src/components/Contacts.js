import React from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Body, Right, Left, Item, Input, Form, Button } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { Header } from './common';
import config from '../../../config/config.js';

const apiBaseUrl = config.API_BASE_URL;

class Contacts extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Contacts',
    tabBarIcon: () => (<Icon size={24} color="white" name="contacts" />)
  }

  constructor (props) {
    super(props);
    this.state = {
      email: ''
    }

    this.handleClickContact = this.handleClickContact.bind(this);
    this.handleSubmitContact = this.handleSubmitContact.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
  }

  handleClickContact(receiver) {
    this.props.setActiveContact(receiver);
    return this.props.navigation.navigate('Lotes');
  }

  handleEmailInput(e) {
    this.setState({
      email: e
    });
  }

  handleSubmitContact (e) {
    e.preventDefault();
    axios.post(`${apiBaseUrl}/profiles/${this.props.profile.id}/contacts`, {
      senderId: this.props.profile.id,
      receiverEmail: this.state.email
    })
    .then((res) => {
      this.props.getContacts(this.props.profile.id);
    })
    .catch((err) => {
      console.log (err);
    });

    this.setState({email: ''})
  }

  render() {
    return (
      <Container>
        <Header headerText='Contacts' { ...this.props } />
        <Content>
          <List>
            { this.props.contacts.map((contact) => {
              return (
                <ListItem key={ contact.receiver.id } onPress={ () => this.handleClickContact(contact.receiver) }>
                  <Text>{ contact.receiver.display ? contact.receiver.display : contact.receiver.email }</Text>
                </ListItem>
              )
            })}
          </List>
        </Content>  
        <View style={{ alignSelf: 'center', paddingBottom:10 }}>
          <Text>New Contact:</Text>
        </View>       
          <Item regular>
            <Input ref="email" onChangeText={ this.handleEmailInput } value={ this.state.email } placeholder="Enter email address"/>
          </Item>
        
        <View style={{ alignSelf:'center', padding:10 }}>
          <Button primary onPress={ this.handleSubmitContact }>
            <Text style={{ color:'white', fontSize:20 }}>Submit</Text>
          </Button>
        </View>
      </Container>
    );
 }
}

export default Contacts;
