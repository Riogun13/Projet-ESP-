import React, {Component} from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Alert
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import firebase from 'react-native-firebase';
import Colors from '../../res/colors';

import MapInformation from './mapInformation'
import { NavigationEvents } from 'react-navigation';

import NotifService from '../../library/notification/notifService';
import sculpturesEmitter from '../../res/sculptures';

let sculptureList = null;

sculpturesEmitter.on('onSculptureCollectionUpdate', function (sculptures) {
  sculptureList = sculptures;
  updateStateSculpture();
});

function updateStateSculpture(){
  try {
    this.setState({sculptures: sculptureList, markers: this.generarteMarkers(sculptureList)});
    console.log("updateStateSculpture MAP");
  } catch (error) {
    //path to exile
  }
}

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
      sculptures: sculptureList,
      markers: this.generarteMarkers(sculptureList),
    };
    updateStateSculpture = updateStateSculpture.bind(this);
    this.mapRef = null;
    this.selectedSculpture = null;
    this.focusUser = false;
    this.notifService = new NotifService();
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
      navigator.geolocation.getCurrentPosition(
        position => {
          this.mapRef.animateToRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0022921918458749246,
            longitudeDelta: 0.0024545565247535706,
            }, 1000);
            this._MapInformation.updateMapInformationState(false, null);
        }, 
        error => this.setState({error : error.message}),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
      )
    }
  }

  getNewDimensions(event){
    this.setState({
      pageHeight: event.nativeEvent.layout.height,
      pageWidth: event.nativeEvent.layout.width
    });
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

  generarteMarkers(sculptures) {
    const markers = [];
    Object.keys(sculptures).map((year, index) =>{
      Object.keys(sculptures[year]).map((sculptureId, index) =>{
        markers.push({latitude: sculptures[year][sculptureId].Coordinate.latitude, longitude: sculptures[year][sculptureId].Coordinate.longitude});
      });
    });
    return markers;
  }

  showMarkers = () => {
    let markers = []

    Object.keys(this.state.sculptures).map((year, index) =>{
      Object.keys(this.state.sculptures[year]).map((sculptureId, index) =>{
        markers.push(
          <MapView.Marker
            key={sculptureId}
            coordinate={{latitude: this.state.sculptures[year][sculptureId].Coordinate.latitude, longitude: this.state.sculptures[year][sculptureId].Coordinate.longitude}}
            onPress={(event) =>{
              this._MapInformation.updateMapInformationState(true, this.state.sculptures[year][sculptureId]);
            }}
            pinColor={
              this.getMarkerColor(this.state.sculptures[year][sculptureId].Thematic.Year)
            }
          >
          </MapView.Marker>
        );
      });
    });

    return markers
  }

  componentWillMount() {
    setTimeout(()=>this.setState({marginBottom: 0}),1000);
  }

  componentDidMount() {
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
              {this.showMarkers()}
            </MapView>
            <MapInformation ref={ref => (this._MapInformation = ref)} navigation={this.props.navigation}></MapInformation>
          </ScrollView>
        </View>
      );
    }
  }
}

export default Map;