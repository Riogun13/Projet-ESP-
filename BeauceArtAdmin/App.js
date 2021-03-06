/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, {Component} from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './src/screen/Home';
import CollaboraterStack from './src/navigation/CollaboraterStack';
import SculptureStack from './src/navigation/SculptureStack';
import NewsStack from './src/navigation/NewsStack';
import Colors from './src/res/colors';

import NavigationService from './NavigatorService';




AppContainer = createAppContainer(createBottomTabNavigator(
  {
    Nouvelles: NewsStack.NewsStack, //revenir ici pour demander a simon si faut mettre News ou Nouvelles
    Home: Home,
    Sculptures: SculptureStack.SculptureStack,
    Collaborater: CollaboraterStack.CollaboraterStack,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Sculptures') {
            iconName = `ios-list-box`;
        } else if (routeName === 'Home') {
            iconName = `ios-home`;
        } else if (routeName === 'Nouvelles') {
            iconName = `ios-calendar`;
        } else if (routeName === 'Collaborater'){
          iconName = `ios-people`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: Colors.accentOrange,
        inactiveTintColor: '#444444',
        style: {
        backgroundColor: Colors.primary
        }
    },
  }
))

class App extends React.Component<Props> {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }} 
      />
    );
  }

};

export default App;

