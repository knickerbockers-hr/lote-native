import React from 'react';
import ReactNative, { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './client/src/store';
import listeners from './client/src/listeners';
import Nav from './client/src/components/Nav';

const Lote = () => {
  return (
    <Provider store={store}>
       <Nav />
    </Provider>
  );
};

AppRegistry.registerComponent('loteNative', () => Lote);
