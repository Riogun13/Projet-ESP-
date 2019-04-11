
import React, {Component} from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import MapStack from './stacks/mapStack'
import NewsStack from './stacks/newsStack'
import DonationStack from './stacks/donationStack'
import AboutStack from './stacks/aboutStack'
import SculptureStack from './stacks/sculptureStack'
import Colors from '../res/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';



module.exports = { 
    AppContainer: createAppContainer(createBottomTabNavigator(
    {
    Nouvelles: NewsStack.NewsStack,
    Sculptures: SculptureStack.SculptureStack,
    Carte: MapStack.MapStack,
    Donation: DonationStack.DonationStack,
    Info: AboutStack.AboutStack
    },
    {
    initialRouteName: 'Carte',
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Nouvelles') {
            iconName = `ios-calendar`;
        } else if (routeName === 'Sculptures') {
            iconName = `ios-list-box`;
        }else if (routeName === 'Carte') {
            iconName = `ios-pin`;
        }else if (routeName === 'Donation') {
            iconName = `logo-usd`;
        }else if (routeName === 'Info') {
            iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: Colors.accentOrange,
        inactiveTintColor: Colors.black,
        style: {
        backgroundColor: Colors.primary
        }
    },
    }
))
}