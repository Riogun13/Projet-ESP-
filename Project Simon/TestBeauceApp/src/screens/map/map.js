import React, {Component} from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Alert,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import firebase from 'react-native-firebase';

import MapStyle from '../../res/styles/map';

import MapInformation from './mapInformation'
import { NavigationEvents } from 'react-navigation';

import NotifService from '../../library/notification/notifService';

class Map extends Component {

  static navigationOptions = {
    title: 'Carte',
  };
  constructor(props){
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      statusBarHeight: 0,
      pageHeight: Dimensions.get('screen').height,
      pageWidth: Dimensions.get('screen').width,
    };
    this.mapRef = null;
    this.selectedSculpture = null;
    this.notifService = new NotifService();
  }

  getParams(){
    this.selectedSculpture = this.props.navigation.getParam('selectedSculpture');
  }

  focusOnSculpture(sculpture){
    if(sculpture !== null && sculpture !== undefined){
      console.log(sculpture);
      this.mapRef.animateToRegion({
        latitude: sculpture.Coordinate.latitude,
        longitude: sculpture.Coordinate.longitude,
        latitudeDelta: 0.0022921918458749246,
        longitudeDelta: 0.0024545565247535706,
      }, 1000);
      this._MapInformation.updateMapInformationState(true, sculpture);
    }
  }
  getNewDimensions(event){
    this.setState({
      pageHeight: event.nativeEvent.layout.height,
      pageWidth: event.nativeEvent.layout.width
    });
  }

  async getSculpture() {
    const sculptures = [];
    await firebase.firestore().collection('Sculpture').get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          sculptures.push(doc.data());
        });
      });
      this.setState({sculptures: sculptures});
    return sculptures;
  }

  getMarkerColor(year){
    switch (year){
      case 2014:
        return 'green';
      case 2015:
        return 'aqua';
      case 2016:
        return 'purple';
      case 2017:
        return 'orange';
      case 2018:
        return 'indigo';
      default:
        return 'red';
    }
  }

  fitMapToMarkers(){
    setTimeout( ()=> {
      if(this.mapRef){
        if(this.selectedSculpture == null) {
          this.mapRef.fitToCoordinates(this.state.markers,
          { animated: true });
        }
      }
    },1000);
  }

  addGeoFence(){
    setTimeout( ()=>{ 
      this.state.sculptures.map((sculpture, index) => {
        navigator.geolocation.getCurrentPosition(
          position => {
            if(this.distanceEntreDeuxCoordonees(position.coords.latitude,position.coords.longitude,sculpture.Coordinate.latitude,sculpture.Coordinate.longitude) <= 25){
              this.notifService.localNotif("MapInformationNotif", "Beauce Art", "Vous êtes proche d'une sculpture", {tabToOpen:"Carte"});
            }
          }, 
          error => this.setState({error : error.message}),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
        );
      });
      this.addGeoFence();
    },10000)
  }

  distanceEntreDeuxCoordonees(lat1,lon1,lat2,lon2) {
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

  setMarkers(sculptures) {
    const markers = [];
    sculptures.map((sculpture, index) => {
      markers.push({latitude: sculpture.Coordinate.latitude, longitude: sculpture.Coordinate.longitude});
    });
    this.setState({markers: markers});
    return markers;
  }

  componentWillMount() {
    setTimeout(()=>this.setState({statusBarHeight: 5}),500);
  }

  componentDidMount() {
    this.getSculpture().then(()=>{
      this.setMarkers(this.state.sculptures);
     //this.addGeoFence();
    });
  }

  onLayout(e){
    const {newWidth, newHeight} = Dimensions.get('screen')
  }

  render() {
    if(typeof this.state.markers === "undefined"){
      return (
        <View style={{flex: 1}} onLayout={(e)=>this.getNewDimensions(e)}>
          <ScrollView contentContainerStyle={StyleSheet.absoluteFillObject}>
            <MapView
              style={{flex: 1}}
              region={{
                latitude: 46.123532,
                longitude: -70.681716,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
              followsUserLocation={true}
              scrollEnabled={false}
            >
            </MapView>
          </ScrollView>
        </View>
      );
    }else{
      return (
        <View
          style={{flex: 1}}
          onLayout={(e)=>{
            this.getNewDimensions(e);
            //on change of orientation make the popup
            this._MapInformation.updateMapInformationState(false, null);
          }}
        >
          <NavigationEvents
            onWillFocus={payload =>{
              this._MapInformation.updateMapInformationState(false,null);
              this.getParams();
              this.focusOnSculpture(this.selectedSculpture);
            }}
            onWillBlur={payload => {
              //this.addGeoFence();
            }}>



          </NavigationEvents>
          <ScrollView contentContainerStyle={StyleSheet.absoluteFillObject} style={{paddingTop: this.state.statusBarHeight}}>
            <MapView
              ref={ref => { this.mapRef = ref}}
              onLayout = {this.fitMapToMarkers()}
              style={{flex: 1}}
              region={{
                latitude: 46.123532,
                longitude: -70.681716,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
              followsUserLocation={true}
              scrollEnabled={true}
              onRegionChange={(region)=> console.log(region)}
              onPress={() =>{
                this._MapInformation.updateMapInformationState(false, null);
              }}
            >
              {this.state.sculptures.map((sculpture,index) => (
                <MapView.Marker 
                  key={index}
                  coordinate={{latitude: sculpture.Coordinate.latitude, longitude: sculpture.Coordinate.longitude}}
                  onPress={(event) =>{
                    this._MapInformation.updateMapInformationState(true, sculpture);
                    // this.setState(selectedArtwork:index);
                  }}
                  pinColor={
                    // if (this.state.selectedArtwork == index) {
                    //   Other color
                    // }
                    this.getMarkerColor(sculpture.Thematic.Year)
                  }
                >
                </MapView.Marker>
              ))}
            </MapView>
            <MapInformation ref={ref => (this._MapInformation = ref)} navigation={this.props.navigation}></MapInformation>
          </ScrollView>
        </View>
      );
    }
  }
}

export default Map;