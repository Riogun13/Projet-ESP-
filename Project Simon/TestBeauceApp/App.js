/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 //Component lifecycle : http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

import React, {Component} from 'react';
import AppContainer from './src/navigation/appContainer'
import NotifService from './src/library/notification/notifService';
import type { Notification, NotificationOpen } from 'react-native-firebase';
import Firebase from 'react-native-firebase';

import { BackHandler, DeviceEventEmitter, AppRegistry} from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";


const LogLocation = async (data) => {
console.log("setwegwegergwergerg");
checkGeoFence();

}
AppRegistry.registerHeadlessTask('LogLocation', () => LogLocation);

function checkGeoFence(){
  let notifService = new NotifService();
  console.log("12313");
  getSculpture().then((sculptures)=>{
    console.log(sculptures, "inside");
    sculptures.map((sculpture, index) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          if(distanceEntreDeuxCoordonees(position.coords.latitude,position.coords.longitude,sculpture.Coordinate.latitude,sculpture.Coordinate.longitude) <= 25){
            notifService.localNotif("MapInformationNotif", "Beauce Art", "Vous êtes proche d'une sculpture", {tabToOpen:"Carte"});
          }
        }, 
        error => console.log("erreur rererer"),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
      );
    });
  });
}

function distanceEntreDeuxCoordonees(lat1,lon1,lat2,lon2) {
  var R = 6371; // km (change this constant to get miles)
  var dLat = (lat2-lat1) * Math.PI / 180;
  var dLon = (lon2-lon1) * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return Math.round(d*1000);
}

async function getSculpture() {
  const sculptures = [];
  await Firebase.firestore().collection('Sculpture').get()
    .then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        sculptures.push(doc.data());
      });
    });
    console.log(sculptures);
  return sculptures;
}

type Props = {};

class App extends React.Component<Props> {
  constructor(props){
    super(props);
    this.notifService = new NotifService();
    //this.notifService.removeAllDeliveredNotifications();
  }

  componentWillMount(){
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
        ok: "YES",
        cancel: "NO",
        enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        showDialog: true, // false => Opens the Location access page directly
        openLocationServices: true, // false => Directly catch method is called if location services are turned off
        preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
        preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
        providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
    }).then(function(success) {
        console.log(success); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}


    }).catch((error) => {// catch egale le choix non de l'utilisateur
        console.log(error.message); // error.message => "disabled"
    });
    
    BackHandler.addEventListener('hardwareBackPress', () => { //(optional) you can use it if you need it
      //do not use this method if you are using navigation."preventBackClick: false" is already doing the same thing.
      LocationServicesDialogBox.forceCloseDialog();
    });
    
    DeviceEventEmitter.addListener('locationProviderStatusChange', function(status) { // only trigger when "providerListener" is enabled
  
    console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
    });
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