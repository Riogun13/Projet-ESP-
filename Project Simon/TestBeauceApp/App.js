/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { View, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Map from './src/screens/map/map';
import Details from './src/screens/sculptureInformations/sculptureInformations';
import Header from './src/screens/header';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Colors from './src/res/colors';


const RootStack = createStackNavigator(
  {
    Map: Map,
    Details: Details,
  },
  {
    initialRouteName: 'Map',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
};