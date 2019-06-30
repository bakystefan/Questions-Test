/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Provider } from 'react-redux';
import Router from './src/Router';
/* Redux store */
import reduxStore from './src/redux';

const store = reduxStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />     
      </Provider>
    );
  }
}
