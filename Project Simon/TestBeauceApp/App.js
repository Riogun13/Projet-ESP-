/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 //Component lifecycle : http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

import React, {Component} from 'react';
import { View, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Map from './src/screens/map/map';
import Header from './src/screens/header';
import NotifService from './src/library/notification/notifService';
import type { Notification, NotificationOpen } from 'react-native-firebase';
import Firebase from 'react-native-firebase';

type Props = {};

class App extends Component<Props> {
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
      this.notifService.removeDeliveredNotification(notification.notificationId);
    });
  }

import AppContainer from './src/navigation/appContainer'
export default class App extends React.Component {
  render() {
    return <AppContainer.AppContainer />;
  }
};