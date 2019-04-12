import React, {Component} from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import firebase from 'react-native-firebase';
import Colors from '../../res/colors';

import MapInformation from './mapInformation'
import { NavigationEvents } from 'react-navigation';

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
      marginBottom: 1,
    };
    this.mapRef = null;
    this.selectedSculpture = null;
    this.focusUser = false;
  }

  getParams(){
    this.selectedSculpture = this.props.navigation.getParam('selectedSculpture');
    this.focusUser = this.props.navigation.getParam('focusUser',false);
  }

  focusPosition(){
    this.setState({marginBottom: 0});
    setTimeout(()=>{
      if(this.focusUser){
        this.focusOnUserCoordinate();
      }else if(this.selectedSculpture){
        this.focusOnSculpture(this.selectedSculpture);
      }
    }, 1000);
  }
  focusOnSculpture(sculpture){
    if(sculpture !== null && sculpture !== undefined){
      this.mapRef.animateToRegion({
        latitude: sculpture.Coordinate.latitude,
        longitude: sculpture.Coordinate.longitude,
        latitudeDelta: 0.0022921918458749246,
        longitudeDelta: 0.0024545565247535706,
      }, 1000);
      this._MapInformation.updateMapInformationState(true, sculpture);
    }
  }

  focusOnUserCoordinate(){
    if(this.focusUser) {
      this.mapRef.animateToRegion({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.0022921918458749246,
      longitudeDelta: 0.0024545565247535706,
      }, 1000);
      this._MapInformation.updateMapInformationState(false, null);
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
        if(this.selectedSculpture == null && this.focusUser == false) {
          this.mapRef.fitToCoordinates(this.state.markers,
          { animated: true });
        }
      }
    },1000);
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
    setTimeout(()=>this.setState({marginBottom: 0}),1000);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      }, 
      error => this.setState({error : error.message}),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
    );

    this.getSculpture().then(()=>{
      this.setMarkers(this.state.sculptures);
    });

  }

  onLayout(e){
    const {newWidth, newHeight} = Dimensions.get('screen')
  }

  render() {
    if(typeof this.state.markers === "undefined"){
      return null;
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
              this.focusPosition();
            }}>

          </NavigationEvents>
          <ScrollView contentContainerStyle={StyleSheet.absoluteFillObject} style={{paddingTop: this.state.statusBarHeight}}>
            <MapView
              ref={ref => { this.mapRef = ref}}
              onLayout = {this.fitMapToMarkers()}
              style={{flex: 1, marginBottom: this.state.marginBottom}}
              region={{
                latitude: 46.123532,
                longitude: -70.681716,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
              followsUserLocation={true}
              scrollEnabled={true}
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
                  }}
                  pinColor={
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