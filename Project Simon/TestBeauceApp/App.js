/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 //Component lifecycle : http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

import React, {Component} from 'react';
import NotifService from './src/library/notification/notifService';
import type { Notification, NotificationOpen } from 'react-native-firebase';
import Firebase from 'react-native-firebase';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import MapStack from './src/navigation/stacks/mapStack'
import NewsStack from './src/navigation/stacks/newsStack'
import DonationStack from './src/navigation/stacks/donationStack'
import AboutStack from './src/navigation/stacks/aboutStack'
import SculptureStack from './src/navigation/stacks/sculptureStack'
import Colors from './src/res/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationService from './NavigatorService';
import { NavigationActions } from 'react-navigation';

type Props = {};

AppContainer = createAppContainer(createBottomTabNavigator(
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
    this.notifService = new NotifService();
    //this.notifService.removeAllDeliveredNotifications();
  }
  
  async componentDidMount() {
    const notificationOpen: NotificationOpen = await Firebase.notifications().getInitialNotification();
    if (notificationOpen) { // App was opened by a notification
        const notification: Notification = notificationOpen.notification;
        this.notifService.removeDeliveredNotification(notification.notificationId);
    }

    this.notificationOpenedListener = Firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      const notification: Notification = notificationOpen.notification;
      // this.props.navigation.navigate(notification.data.tabToOpen);
      NavigationService.navigate(notification.data.tabToOpen,{focusUser: true},notification.data.stackToOpen);
      this.notifService.removeDeliveredNotification(notification.notificationId);

    });
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