
import React, {Component} from 'react';
import {createStackNavigator } from 'react-navigation';

import Colors from '../../res/colors';
import About from '../../screens/about/about';

module.exports = {
    AboutStack: createStackNavigator(
        {
          About: About
        },
        {
          initialRouteName: 'About',
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
}