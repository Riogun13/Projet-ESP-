
import React, {Component} from 'react';
import {createStackNavigator } from 'react-navigation';

import Colors from '../res/colors';
import Collaborater from '../screen/Collaborater';
import CollaboraterForm from '../screen/CollaboraterForm/CollaboraterForm';

module.exports = {
    CollaboraterStack: createStackNavigator(
        {
            Collaboraters: Collaborater,
            CollaboraterForm: CollaboraterForm
        },
        {
            initialRouteName: 'Collaboraters',
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