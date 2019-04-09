
import React, {Component} from 'react';
import {createStackNavigator } from 'react-navigation';

import Colors from '../../res/colors';
import Map from '../../screens/map/map';
import Details from '../../screens/sculptureInformations/sculptureInformations'

module.exports = {
    MapStack: createStackNavigator(
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
  )
};