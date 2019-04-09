
import React, {Component} from 'react';
import {createStackNavigator } from 'react-navigation';

import Colors from '../../res/colors';
import News from '../../screens/news/news';

module.exports = {
    NewsStack: createStackNavigator(
      {
        News: News
      },
      {
        initialRouteName: 'News',
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