/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';
import {StackNavigator,} from 'react-navigation';
import Genders from './src/Screens/Genders';
import Movies from './src/Screens/Movies';
import DetailMovie from './src/Screens/DetailMovie';

export default class App extends Component {
  render() {
    return <RootStack/>;
  }
}

const RootStack = StackNavigator(
  {
    genders: {screen: Genders},
    movies: {screen: Movies},
    detailMovie: {screen: DetailMovie}
  },
  {
    initialRouteName: 'genders',
  }
);
