
import React, {Component} from 'react';
import {createStackNavigator } from 'react-navigation';

import Colors from '../../res/colors';
import SculptureList from '../../screens/sculptureList/sculptureList';

module.exports = {
    SculptureStack: createStackNavigator(
        {
            Sculptures: SculptureList
        },
        {
            initialRouteName: 'Sculptures',
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