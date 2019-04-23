
import React, {Component} from 'react';
import {createStackNavigator } from 'react-navigation';

import Colors from '../../res/colors';
import Donation from '../../screens/donation/donation';
import DonationForm from '../../screens/donation/donationForm';

module.exports = {
    DonationStack: createStackNavigator(
        {
          Donation: Donation,
          DonationForm: DonationForm
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
  