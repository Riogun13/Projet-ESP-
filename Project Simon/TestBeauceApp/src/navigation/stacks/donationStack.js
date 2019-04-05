
import React, {Component} from 'react';
import {createStackNavigator } from 'react-navigation';

import Colors from '../../res/colors';
import Donation from '../../screens/donation/donation';

module.exports = {
    DonationStack: createStackNavigator(
        {
          Donation: Donation
        },
        {
          initialRouteName: 'Donation',
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
  