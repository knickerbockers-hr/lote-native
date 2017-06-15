import React from 'react';
import { connect } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import * as actionCreators from '../actions/actionCreators';

import Home from './Home';
import Contacts from './Contacts';
import NewLote from './NewLote';
import MyProfile from './MyProfile';
import Info from './Info';
import Map from './Map';
import Lotes from './Lotes';
import Lote from './Lote';

var HomeScreen = connect((state) => { return state; }, actionCreators)(Home);
var ContactsScreen = connect((state) => { return state; }, actionCreators)(Contacts);
var NewLoteScreen = connect((state) => { return state; }, actionCreators)(NewLote);
var MyProfileScreen = connect((state) => { return state; }, actionCreators)(MyProfile);
var InfoScreen = connect((state) => { return state; }, actionCreators)(Info);
var MapScreen = connect((state) => { return state; }, actionCreators)(Map);
var LotesScreen = connect((state) => { return state; }, actionCreators)(Lotes);
var LoteScreen = connect((state) => { return state; }, actionCreators)(Lote);

export const NewLoteStack = StackNavigator({
  NewLote: {
    screen: NewLoteScreen,
    navigationOptions: {
      tite: 'New Lote',
    }
  }
}, {
  mode: 'card',
  cardStyle: { backgroundColor: 'white' },
  tintColor: '#ffffff',
  headerMode: 'none',
});

export const ContactsStack = StackNavigator({
  Contacts: {
    screen: ContactsScreen,
  },
  Lotes: {
    screen: LotesScreen,
  },
  Lote: {
    screen: LoteScreen,
  }
}, {
  mode: 'card',
  cardStyle: { backgroundColor: 'white' },
  tintColor: '#ffffff',
  headerMode: 'none'
})

const Nav = TabNavigator({
  Home: { screen: HomeScreen  },
  Contacts: { screen: ContactsStack },
  NewLote: { screen: NewLoteStack },
  MyProfile: { screen: MyProfileScreen },
  Info: { screen: InfoScreen },
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: 'white',
      rippleColor: 'white',
      tabs: {
        Home: {
          barBackgroundColor: '#37474F'
        },
        Contacts: {
          barBackgroundColor: '#37474F'
        },
        NewLote: {
          barBackgroundColor: '#37474F',
        },
        MyProfile: {
          barBackgroundColor: '#37474F'
        },
        Info: { 
          barBackgroundColor: '#37474F',
        }
      }
    },
  }
});

export default Nav;
