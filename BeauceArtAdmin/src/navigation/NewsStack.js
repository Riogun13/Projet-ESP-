
import React, {Component} from 'react';
import {createStackNavigator } from 'react-navigation';

import Colors from '../res/colors';
import News from '../screen/News';
import NewsForm from '../screen/NewsForm/NewsForm';

module.exports = {
    NewsStack: createStackNavigator(
        {
            News: News,
            NewsForm: NewsForm
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