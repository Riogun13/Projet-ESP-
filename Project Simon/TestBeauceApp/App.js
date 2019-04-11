/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 //Component lifecycle : http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

import React, {Component} from 'react';
import { Alert } from 'react-native';
import AppContainer from './src/navigation/appContainer'
import NotifService from './src/library/notification/notifService';
import type { Notification, NotificationOpen } from 'react-native-firebase';
import Firebase from 'react-native-firebase';

type Props = {};

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
        console.log(notification);
        this.notifService.removeDeliveredNotification(notification.notificationId);
    }

    this.notificationOpenedListener = Firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      const notification: Notification = notificationOpen.notification;
      console.log(notification.data.tabToOpen);
      // this.props.navigation.navigate(notification.data.tabToOpen);
      this.notifService.removeDeliveredNotification(notification.notificationId);
    });
  }

  render() {
    return <AppContainer.AppContainer />;
  }

};

export default App;