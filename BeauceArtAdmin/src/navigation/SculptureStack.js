
import React, {Component} from 'react';
import {createStackNavigator } from 'react-navigation';

import Colors from '../res/colors';
import Sculpture from '../screen/Sculptures';
import SculptureForm from '../screen/SculptureForm/SculptureForm';

module.exports = {
    SculptureStack: createStackNavigator(
        {
            Sculptures: Sculpture,
            SculptureForm: SculptureForm
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