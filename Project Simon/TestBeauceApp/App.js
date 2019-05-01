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
import SplashScreen from 'react-native-splash-screen';

import { BackHandler, DeviceEventEmitter, AppRegistry, PermissionsAndroid, Alert, NativeModules, Platform} from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

import OfflineNotice from './src/library/noConnectionSign/offlineNotice'
import { NetInfo } from 'react-native'
let sculptures = null;
let notifService = new NotifService();

const LogLocation = async (data) => {
  checkGeoFence();
}
AppRegistry.registerHeadlessTask('LogLocation', () => LogLocation);

function checkGeoFence(){
  if(sculptures != null){

  }else{
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

async function requestLocationPermission() 
{
  if (Platform.OS === 'ios') {
    //Some code here
    //Code graveyard
  }else{
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        NativeModules.LocationService.start();
      } else {
        NativeModules.LocationService.stop();
      }
    } catch (err) {
      console.warn(err)
    }
  }
}

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
  }

  UNSAFE_componentWillMount(){
    requestLocationPermission();
    if(Platform.OS != 'ios'){

      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: "<h2 style='color: #0af13e'>Utiliser la geolocalisation ?</h2>Cette application veut changer les paramètres de votre appareil:<br/><br/>Utiliser le GPS, le Wi-Fi et le réseau cellulaire pour la localisation<br/>",
        ok: "OUI",
        cancel: "NON",
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
      
  }

  async componentDidMount() {
    SplashScreen.hide();
    const notificationOpen: NotificationOpen = await Firebase.notifications().getInitialNotification();
    if (notificationOpen) { // App was opened by a notification
        const notification: Notification = notificationOpen.notification;
        this.notifService.removeDeliveredNotification(notification.notificationId);
    }

    this.notificationOpenedListener = Firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      const notification: Notification = notificationOpen.notification;
      NavigationService.navigate(notification.data.tabToOpen,{focusUser: true, selectedSculpture: null},notification.data.stackToOpen);
      this.notifService.removeDeliveredNotification(notification.notificationId);
    });
  }

  render() {
    return (
      
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }} 
      >
      <OfflineNotice />
      </AppContainer>
      
    );
  }

};

export default App;