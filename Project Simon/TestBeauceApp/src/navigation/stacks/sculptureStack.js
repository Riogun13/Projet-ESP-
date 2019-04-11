
import React, {Component} from 'react';
import {createStackNavigator } from 'react-navigation';

import Colors from '../../res/colors';
import SculptureList from '../../screens/sculptureList/sculptureList';
import Detail from '../../screens/sculptureInformations/sculptureInformations';

module.exports = {
    SculptureStack: createStackNavigator(
        {
            Sculptures: SculptureList,
            SculptureDetail: Detail
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